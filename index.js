window.explorationsNav = window.explorationsNav || {};

window.explorationsNav = {
  init: function() {
    this.dataSource = {
      'fantasy-football': {
        url: 'https://explorations.viget.com/fantasy-football', title: 'The Future of Fantasy Football'
      },
      'medicine': {
        url: 'https://explorations.viget.com/medicine', title: 'Improving Medication Adherence'
      },
      'fridge': {
        url: 'https://explorations.viget.com/fridge', title: 'Refrigerator Refresh'
      },
      'homebuying': {
        url: 'https://explorations.viget.com/homebuying', title: 'Reimagining the home buying process'
      },
      'onlineshopping': {
        url: 'https://explorations.viget.com/onlineshopping', title: 'Improving the way we shop online'
      }
    };

    this.setCurrentSite();
    this.appendElements();
    this.setVars();
    this.bindEvents();
  },

  appendElements: function() {
    let dynamicLinks = this.generateLinkMarkup();
    let navMarkup = this.generateNavMarkup(dynamicLinks);
    let stylesheet = this.generateStylesheet();

    document.head.appendChild(stylesheet);
    document.body.insertAdjacentHTML('afterbegin', navMarkup );
  },

  setVars: function() {
    this.navEl = document.querySelector('.gnav-explorations-nav');
    this.navBtn = this.navEl.querySelector('.gnav-explorations-nav__button');
  },

  bindEvents: function() {
    this.navBtn.addEventListener('click', () => this.navEl.classList.toggle('-open'));
  },

  setCurrentSite: function() {
    let dataset = document.getElementById('globalNav-script').dataset;
    let currentSite = this.dataSource[dataset.currentSite];
    currentSite.className = '-current';
    currentSite.url = '#';

    this.colorBase = dataset.colorBase;
    this.colorLogo = dataset.colorLogo;
    this.colorMenu = dataset.colorMenu;
  },

  generateLinkMarkup: function() {
    return Object.values(this.dataSource).reduce((markup, pointed) => {
      let className = pointed.className ? pointed.className : '';

      return markup += `<li><a class="gnav-explorations-nav__link ${className}" href="${pointed.url}">${pointed.title}</a></li>`;
    }, '')
  },

  generateNavMarkup: function(links) {
    return `<nav class="gnav-explorations-nav"><div class="gnav-explorations-nav__top"> <div class="gnav-explorations-nav__container"> <div class="gnav-explorations-nav__logo"> <a href="https://viget.com"> <svg xmlns="http://www.w3.org/2000/svg" width="500" height="181.079" viewBox="0 0 500 181.079"><path fill="#fff" d="M77.144 90.693c0 21.3-17.264 38.58-38.563 38.58-21.312 0-38.58-17.28-38.58-38.58 0-21.32 17.268-38.59 38.58-38.59 21.3 0 38.566 17.272 38.566 38.59"/><path fill="#fff" d="M114.678 48.59c0 11.165-9.037 20.196-20.187 20.196-11.14 0-20.18-9.032-20.18-20.196 0-11.15 9.04-20.2 20.18-20.2 11.15 0 20.19 9.05 20.19 20.2"/><path fill="#fff" d="M246.277 52.125h-6.374c-1.774 0-3.372 1.595-3.372 3.376v70.324c0 1.774 1.6 3.372 3.375 3.372h6.374c1.775 0 3.375-1.598 3.375-3.372v-70.32c0-1.78-1.6-3.377-3.376-3.377zm133.89-.027c-22.028.242-36.653 17.99-36.653 38.656 0 21.167 17.158 38.662 39.438 38.662 12.705 0 22.486-5.974 26.23-10.188 1.75-1.97 1.186-3.162-.363-4.58-1.356-1.254-2.84-2.734-4.187-3.982-1.24-1.145-2.19-1.094-3.824.128-4.726 3.513-10.63 6.03-18.36 6.03-14.713 0-25.345-10.604-26.08-22.942h53.893c1.65 0 3.13-1.294 3.31-3.128.19-1.29.373-3.682.373-4.976 0-19.167-14.683-33.44-33.78-33.68zM356.66 83.573c.732-10.458 9.916-20.25 22.242-20.25 11.237 0 21.79 9.57 22.333 20.25H356.66zm23.02-31.486c.164 0 .325.01.488.01.15 0 .3-.01.452-.01h-.94zm90.487 68.17l-5.318-5.273c-.41-.415-1.735-.892-3.09.277 0 0-2.72 2.504-7.33 2.504-3.184 0-5.77-1.157-7.666-3.113-1.877-1.964-3.07-4.79-3.126-8.316a1.898 1.898 0 0 0-.095-.554V62.722h19.466c1.957 0 3.372-1.595 3.372-3.376v-3.9c0-1.958-1.415-3.375-3.372-3.375h-19.465V32.468c0-1.776-1.417-3.374-3.197-3.374l-5.674.61c-1.773.236-3.376 1.6-3.376 3.374v18.996h-9.234c-1.952 0-3.37 1.417-3.37 3.376v3.896c0 1.78 1.418 3.376 3.37 3.376h9.234v44.21h.08c.146 5.426 2.178 9.578 3.41 11.628 1.112 1.757 3.522 5.18 7.38 7.917v.005a4.3 4.3 0 0 0 .198.13c1.795 1.053 5.773 2.82 11.94 2.814h.043c6.41 0 11.86-2.356 15.78-6.118.41-.394.65-.948.66-1.52a2.158 2.158 0 0 0-.625-1.534zM220.422 52.18h-6.92l-.814.016c-1.547 0-2.58.918-3.09 1.954L185.4 111.546l-23.775-57.53c-.513-1.036-1.544-1.954-3.09-1.954l-.816-.015h-7.11c-2.668 0-3.73 1.778-2.668 4.084l1.267 2.904 28.99 66.736c.64 1.55 1.9 3.37 3.67 3.37h7.063c1.77 0 3.03-1.82 3.677-3.37l29.21-66.6 1.267-2.903c1.066-2.307 0-4.085-2.664-4.085zm90.392 77.248h-25.816c-6.63 0-9.856-4.634-9.856-9.116 0-7.174 7.887-10.76 7.887-10.76s8.436 5.21 18.29 5.21c18.955 0 31.82-14.885 31.82-31.202 0-12.198-7.378-19.292-7.378-19.292l9.754-2.77c1.244-.18 1.97-1.792 1.97-3.05V55.41c0-1.965-1.433-3.404-3.406-3.404h-34.025c-18.642 0-30.298 14.883-30.298 31.553 0 10.576 5.74 17.93 5.74 17.93s-12.01 6.98-12.01 20.606c0 11.118 8.424 15.78 13.087 17.034v.54c-1.8 1.07-10.396 5.915-10.396 16.67 0 11.833 10.395 24.735 34.415 24.735 21.69 0 37.105-14.16 37.105-29.038.003-15.59-11.827-22.61-26.886-22.61zM301.32 63.6c10.776 0 19.507 8.744 19.507 19.52 0 10.784-8.73 19.51-19.507 19.51-10.76 0-19.49-8.727-19.49-19.51 0-10.777 8.73-19.52 19.49-19.52zm-.9 105.832c-12.197 0-21.516-6.275-21.516-14.877 0-10.586 12.015-13.813 12.015-13.813h19.892c12.543 0 13.622 9.323 13.622 11.656 0 10.398-12.19 17.034-24.017 17.034zm-57.39-145.88c-4.124 0-7.473 3.346-7.473 7.638 0 4.133 3.348 7.482 7.474 7.482 4.307 0 7.647-3.35 7.647-7.482 0-4.293-3.34-7.637-7.644-7.637z"/></svg> </a> </div><button class="gnav-explorations-nav__button"> <div class="gnav-explorations-nav__button__content"> <span class="gnav-explorations-nav__button__text">Explorations</span> <span class="gnav-explorations-nav__button__svg"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.5 4.5l3 3.057-12 11.943L.5 7.557l3-3.057 9 9 9-9z"/></svg> </span> </div></button> </div></div><div class="gnav-explorations-nav__bottom"> <div class="gnav-explorations-nav__container"><ul><li><a class="gnav-explorations-nav__link -about" href="http://explorations.viget.com/">About Explorations</a></li>${links}</ul></div></div></nav>`;
  },

  generateStylesheet: function() {
    let stylesheet = document.createElement('link');
    stylesheet.type = 'text/css';
    stylesheet.rel = 'stylesheet';
    stylesheet.href = 'https://chloehwang.github.io/globalNav-script/style.css';

    stylesheet.insertRule(`.gnav-explorations-nav__top{background-color:${this.colorBase}}`, 0);
    stylesheet.insertRule(`.gnav-explorations-nav__logo{background-color:${this.colorLogo}}`, 0);
    stylesheet.insertRule(`.gnav-explorations-nav__bottom{background-color:${this.colorMenu}}`, 0);

    return stylesheet;
  }
};

window.explorationsNav.init();
