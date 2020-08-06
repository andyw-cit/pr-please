const Browser = require('zombie');

const URL = 'https://bitbucket.org/ciandt_it/tdk/pull-requests/'; // current project's PR list URL

const browser = new Browser();

async function openPullRequestsList() {
  return new Promise((resolve, reject) => {
    browser.visit(URL, () => {
      console.log(browser.location.href);
      resolve('success');
    })
  });
}

async function clickOnePRRow() {
  let val = await openPullRequestsList();
  // console.log(val);
  return new Promise((resolve, reject) => {
    console.log(browser.location.href);
    // [data-qa="pull-request-row-link"]
    browser.clickLink('A', () => {
      console.log('open url');
      resolve('click one pr row!');
    })
  });
}

// clickOnePRRow();

// Wait until page is loaded
function pageLoaded(window) {
    return window.document.querySelector('a[data-qa="pull-request-row-link"]');
}

browser.visit(URL).then(null, function(e) {
  console.log(e);
}).then(() => {
  browser.wait(pageLoaded, function() {
    let html = browser.html();
    console.log(html);
  });
})

// browser.visit(URL, () => {
//   console.log(location);
//   browser.clickLink('', () => {
//     browser.fire('button[aria-label="Approve this pull request"]', 'click');
//   })
// });

// browser.visit('https://bitbucket.org/ciandt_it/tdk/pull-requests/', function() {
//   try {
//     browser.assert.element('body')
//   } catch (error) {
//     console.log('error')    
//   }
// });