const d3 = require('d3')

const config = require('../../config')
const { addPdfCoverTitle, addPdfCoverDescription } = require('../pdfPage')
const featureToggles = config().featureToggles

const description = `<section>
<h3>Agile Studio Technology Radarとは</h3>
<p>
  Technology Radar は、Thoughtworks社がソフトウェア開発における新しい技術や手法を評価し、プロジェクトでの利用を推奨するかどうかを示すためのツールです。
  これは、実際の Agile Studio のプロジェクトで利用されている技術や手法を Technology Radar の形式でまとめたものです。
</p>
<p>
  Technology Radar ではソフトウェア構築に関する項目をツール、テクニック、プラットフォーム、言語・フレームワークの 4 つのカテゴリに分類（これは<code>quadrant</code>と呼ばれています。）し、
  プロジェクトでの利用状況についても 4 つの段階に分類しています。（これは<code>ring</code>と呼ばれています。）
  各技術や手法について、その特徴や利点、欠点などを簡潔に説明と実際のプロジェクトので利用情報を記載しています。
</p>
</section>`;

function renderBanner(renderFullRadar) {

  if (featureToggles.UIRefresh2022) {
    const documentTitle = document.title[0].toUpperCase() + document.title.slice(1)

    document.title = documentTitle
    d3.select('.hero-banner__wrapper').append('p').classed('hero-banner__subtitle-text', true).text(document.title)
    d3.select('.hero-banner__title-text').on('click', renderFullRadar)
    d3.select('#site-description').html(description)

    addPdfCoverTitle(documentTitle)
    addPdfCoverDescription(description)
  } else {
    const header = d3.select('body').insert('header', '#radar')
    header
      .append('div')
      .attr('class', 'radar-title')
      .append('div')
      .attr('class', 'radar-title__text')
      .append('h1')
      .text(document.title)
      .style('cursor', 'pointer')
      .on('click', renderFullRadar)

    header
      .select('.radar-title')
      .append('div')
      .attr('class', 'radar-title__logo')
      .html('<a href="https://www.thoughtworks.com"> <img src="/images/logo.png" /> </a>')
  }
}

module.exports = {
  renderBanner,
}
