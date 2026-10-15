/**
 * WS Opale Theme — Dark mode toggle
 * Adds sun/moon toggle to #top-menu, respects prefers-color-scheme,
 * persists preference in localStorage.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'ws-opale-theme';
  var DARK_CLASS = 'theme-ws-dark';
  var LIGHT_CLASS = 'theme-ws-light';

  function getPreference() {
    return localStorage.getItem(STORAGE_KEY); // 'dark', 'light', or null (auto)
  }

  function applyTheme(pref) {
    var body = document.body;
    body.classList.remove(DARK_CLASS, LIGHT_CLASS);
    if (pref === 'dark') {
      body.classList.add(DARK_CLASS);
    } else if (pref === 'light') {
      body.classList.add(LIGHT_CLASS);
    }
    // null = auto (prefers-color-scheme media query handles it)
  }

  function isDarkActive() {
    var pref = getPreference();
    if (pref === 'dark') return true;
    if (pref === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function updateIcon(btn) {
    btn.textContent = isDarkActive() ? '\u2600' : '\u263E'; // sun when dark, moon when light
    btn.title = isDarkActive() ? 'Switch to light mode' : 'Switch to dark mode';
  }

  function toggle() {
    var current = isDarkActive();
    var newPref = current ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, newPref);
    applyTheme(newPref);
    return newPref;
  }

  function init() {
    // Apply saved preference on load
    applyTheme(getPreference());

    // Create toggle button
    var btn = document.createElement('button');
    btn.id = 'ws-theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    updateIcon(btn);

    btn.addEventListener('click', function () {
      toggle();
      updateIcon(btn);
    });

    // Keep the theme toggle beside the user avatar (Redmine 7).
    var topMenu = document.getElementById('top-menu');
    var profileMenu = topMenu && topMenu.querySelector('.profile-menu');
    if (profileMenu) {
      profileMenu.style.display = 'flex';
      profileMenu.style.alignItems = 'center';
      profileMenu.style.justifyContent = 'flex-end';
      profileMenu.style.gap = '8px';
      profileMenu.insertBefore(btn, profileMenu.firstChild);
    } else if (topMenu) {
      var account = document.getElementById('account');
      if (account) {
        btn.style.float = 'right';
        account.parentNode.insertBefore(btn, account);
      } else {
        topMenu.appendChild(btn);
      }
    }

    // Listen for system theme changes
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', function () {
      if (!getPreference()) {
        updateIcon(btn);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
