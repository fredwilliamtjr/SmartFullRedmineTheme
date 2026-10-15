# frozen_string_literal: true

require 'redmine'
require 'json'

# Only the theme asset paths and Activity HTML validators are extended.
# Redmine's original files and non-HTML feeds remain untouched.
module SmartFullThemeCache
  def self.release_for(theme)
    return unless theme

    manifest = File.join(theme.path, 'theme-release.json')
    return unless File.file?(manifest)

    version = JSON.parse(File.read(manifest))['version']
    return unless version.is_a?(String) && version.match?(/\A\d{8}-[a-f0-9]{12}\z/)
    return unless File.file?(File.join(theme.path, 'stylesheets', "application-#{version}.css"))
    return unless File.file?(File.join(theme.path, 'javascripts', "theme-#{version}.js"))

    version
  rescue JSON::ParserError, Errno::ENOENT
    nil
  end

  module ThemePaths
    def stylesheet_path(source)
      version = SmartFullThemeCache.release_for(self)
      return super("application-#{version}") if version && source == 'application'

      super
    end

    def javascript_path(source)
      version = SmartFullThemeCache.release_for(self)
      return super("theme-#{version}") if version && source == 'theme'

      super
    end
  end

  module ActivityValidators
    def stale?(object = nil, **options)
      if request.format.html?
        theme = Redmine::Themes.theme(Setting.ui_theme)
        version = SmartFullThemeCache.release_for(theme)
        if version
          options = options.merge(etag: [options[:etag] || object, theme.id, version])
        end
      end
      super(object, **options)
    end
  end
end

Redmine::Plugin.register :redmine_smartfull_theme_cache do
  name 'SmartFull Theme Cache'
  author 'SmartFull'
  description 'Dated theme assets and theme-aware Activity HTML cache validators'
  version '1.0.0'
end

install = lambda do
  unless Redmine::Themes::Theme.ancestors.include?(SmartFullThemeCache::ThemePaths)
    Redmine::Themes::Theme.prepend(SmartFullThemeCache::ThemePaths)
  end
  unless ActivitiesController.ancestors.include?(SmartFullThemeCache::ActivityValidators)
    ActivitiesController.prepend(SmartFullThemeCache::ActivityValidators)
  end
end

# Redmine loads plugin initializers after Rails' first prepare callback.
install.call
Rails.application.config.to_prepare(&install)
