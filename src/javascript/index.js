window.explorationsNav = window.explorationsNav || {};

window.explorationsNav = {
  init: function() {
    this.dataSource = require('../data/sites.json');

    this.setCurrentSite();
    this.appendElements();
    this.appendStyles();
    this.setVars();
    this.bindEvents();
  },

  setCurrentSite: function() {
    let dataset = document.getElementById('globalNav-script').dataset;
    let currentSite = this.dataSource[dataset.currentSite];

    if (currentSite) {
      currentSite.className = '-current';
      currentSite.url = '#';
    }

    this.colorBase = dataset.colorBase;
    this.colorLogo = dataset.colorLogo;
    this.colorMenu = dataset.colorMenu;
  },

  appendElements: function() {
    let dynamicLinks = this.generateLinkMarkup();
    let navMarkup = this.generateNavMarkup(dynamicLinks);
    document.body.insertAdjacentHTML('afterbegin', navMarkup );
  },

  appendStyles: function() {
    let cssText = { gulp_inject: '../stylesheet/style.css' };
    cssText = cssText += `.gnav-explorations-nav__top{background-color:${this.colorBase}}.gnav-explorations-nav__logo{background-color:${this.colorLogo}}.gnav-explorations-nav__bottom{background-color:${this.colorMenu}}`;

    let stylesheet = document.createElement('style');
    stylesheet.innerHTML = cssText;

    document.head.appendChild(stylesheet);
  },

  setVars: function() {
    this.navEl = document.querySelector('.gnav-explorations-nav');
    this.navBtn = this.navEl.querySelector('.gnav-explorations-nav__button');
  },

  bindEvents: function() {
    this.navBtn.addEventListener('click', () => this.navEl.classList.toggle('-open'));
  },

  generateLinkMarkup: function() {
    return Object.values(this.dataSource).reduce((markup, pointed) => {
      let className = pointed.className ? pointed.className : '';

      return markup += `<li><a class="gnav-explorations-nav__link ${className}" href="${pointed.url}">${pointed.title}</a></li>`;
    }, '')
  },

  generateNavMarkup: function(links) {
    let markup = { gulp_inject: '../data/nav.html' };
    let splitMarkup = markup.split('<!-- INJECT LINKS -->')

    return splitMarkup.join(links);
  },

};

window.explorationsNav.init();
