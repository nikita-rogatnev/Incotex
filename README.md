# Incotex Electronics Group [![Build status][travis-image]][travis-url] [![Dependency status][dependency-image]][dependency-url] [![devDependency status][dev-dependency-image]][dev-dependency-url]

ООО «НПК «Инкотекс», является частью крупного электронного холдинга ИНКОТЕКС, выпускающего огромную номенклатуру электронных изделий, в том числе: контрольно-кассовые машины, POS , принтеры, электронные весы, счетчики электрической энергии и автоматизированные системы контроля и учета энергоресурсов (АСКУЭ), основанных на PLC технологии, полноцветные и монохромные плазменные и светодиодные экраны и табло, дисплеи типа «бегущая строка» и др.

[![Incotex][2]][1]
  [1]: https://rogatnev-nikita.github.io/Incotex/
  [2]: ./images/screenshots/screenshot.png (Incotex screenshot)

## Summary
* High Resolution: Yes
* Compatible Browsers: IE10+, Edge, Firefox, Safari, Opera, Chrome
* Technologies: BEM, LESS, Grunt, HTML5
* Files Included: HTML Files, CSS Files, JS Files, Images
* Columns: 12 (Bootstrap v3.3.7)
* Layout: Responsive

## Build
    cd /[path_to_folder]/src/
    npm i  
    npm run build

## File structure
    ROOT FOLDER
    +-- css /
    ¦    +-- bootstrap.css
    ¦    +-- bootstrap.min.css
    ¦    +-- style.css
    ¦    +-- style.min.css
    ¦
    +-- img /
    ¦
    +-- js /
    ¦    ¦
    ¦    +-- template.js
    ¦
    +-- less /
    ¦   ¦  
    ¦   +-- blocks /
    ¦   ¦   ¦
    ¦   ¦   +-- catalog.less
    ¦   ¦   +-- feature.less
    ¦   ¦   +-- footer.less
    ¦   ¦   +-- header.less
    ¦   ¦   +-- intro.less
    ¦   ¦   +-- main.less
    ¦   ¦   +-- map.less
    ¦   ¦   +-- products.less
    ¦   ¦   +-- promo.less
    ¦   ¦   +-- technology.less
    ¦   ¦   
    ¦   +-- bootstrap /
    ¦   ¦   ¦
    ¦   ¦   +-- alerts.less
    ¦   ¦   +-- badges.less
    ¦   ¦   +-- breadcrumbs.less
    ¦   ¦   +-- button-groups.less
    ¦   ¦   +-- buttons.less
    ¦   ¦   +-- carousel.less
    ¦   ¦   +-- close.less
    ¦   ¦   +-- code.less
    ¦   ¦   +-- component-animations.less
    ¦   ¦   +-- dropdowns.less
    ¦   ¦   +-- forms.less
    ¦   ¦   +-- glyphicons.less
    ¦   ¦   +-- grid.less
    ¦   ¦   +-- input-groups.less
    ¦   ¦   +-- jumbotron.less
    ¦   ¦   +-- labels.less
    ¦   ¦   +-- list-group.less
    ¦   ¦   +-- media.less
    ¦   ¦   +-- mixins.less
    ¦   ¦   +-- modals.less
    ¦   ¦   +-- navbar.less
    ¦   ¦   +-- navs.less
    ¦   ¦   +-- normalize.less
    ¦   ¦   +-- pager.less
    ¦   ¦   +-- pagination.less
    ¦   ¦   +-- panels.less
    ¦   ¦   +-- popovers.less
    ¦   ¦   +-- print.less
    ¦   ¦   +-- progress-bars.less
    ¦   ¦   +-- responsive-embed.less
    ¦   ¦   +-- responsive-utilities.less
    ¦   ¦   +-- scaffolding.less
    ¦   ¦   +-- tables.less
    ¦   ¦   +-- theme.less
    ¦   ¦   +-- thumbnails.less
    ¦   ¦   +-- tooltip.less
    ¦   ¦   +-- type.less
    ¦   ¦   +-- utilities.less
    ¦   ¦   +-- variables.less
    ¦   ¦   +-- wells.less
    ¦   ¦   +-- mixins /
    ¦   ¦       ¦
    ¦   ¦       +-- alerts.less
    ¦   ¦       +-- background-variant.less
    ¦   ¦       +-- border-radius.less
    ¦   ¦       +-- buttons.less
    ¦   ¦       +-- center-block.less
    ¦   ¦       +-- clearfix.less
    ¦   ¦       +-- forms.less
    ¦   ¦       +-- gradients.less
    ¦   ¦       +-- grid-framework.less
    ¦   ¦       +-- grid.less
    ¦   ¦       +-- hide-text.less
    ¦   ¦       +-- image.less
    ¦   ¦       +-- labels.less
    ¦   ¦       +-- list-group.less
    ¦   ¦       +-- nav-divider.less
    ¦   ¦       +-- nav-vertical-align.less
    ¦   ¦       +-- opacity.less
    ¦   ¦       +-- pagination.less
    ¦   ¦       +-- panels.less
    ¦   ¦       +-- progress-bar.less
    ¦   ¦       +-- reset-filter.less
    ¦   ¦       +-- reset-text.less
    ¦   ¦       +-- resize.less
    ¦   ¦       +-- responsive-visibility.less
    ¦   ¦       +-- size.less
    ¦   ¦       +-- tab-focus.less
    ¦   ¦       +-- table-row.less
    ¦   ¦       +-- text-emphasis.less
    ¦   ¦       +-- text-overflow.less
    ¦   ¦       +-- vendor-prefixes.less
    ¦   ¦   
    ¦   +-- general /
    ¦   ¦   ¦
    ¦   ¦   +-- global.less
    ¦   ¦   +-- variables.less
    ¦   ¦
    ¦   +-- bootstrap.less
    ¦   +-- style.less
    ¦
    +-- .csscomb.json
    +-- .editorconfig
    +-- .gitignore
    +-- .travis.yml
    +-- Gruntfile.js
    +-- README.md
    +-- package.json
    ¦
    +-- index.html
    +-- texh.html


[travis-image]: https://travis-ci.org/rogatnev-nikita/Incotex.svg?branch=master
[travis-url]: https://travis-ci.org/rogatnev-nikita/Incotex

[dependency-image]: https://david-dm.org/rogatnev-nikita/Incotex.svg?style=flat-square
[dependency-url]: https://david-dm.org/rogatnev-nikita/Incotex

[dev-dependency-image]: https://david-dm.org/rogatnev-nikita/Incotex/dev-status.svg?style=flat-square
[dev-dependency-url]: https://david-dm.org/rogatnev-nikita/Incotex#info=devDependencies
