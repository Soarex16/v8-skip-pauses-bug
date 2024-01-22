import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({headless: false, devtools: true});
const page = await browser.newPage();
const session = await page.target().createCDPSession();

await session.send('Debugger.enable');
await session.send('Log.enable');
await session.send('Runtime.enable');
await session.send('Page.enable');

await session.send('Target.setAutoAttach', {"autoAttach": true, "waitForDebuggerOnStart": true})

await session.send('Page.navigate', {url: 'http://127.0.0.1:8080/web/'});

await session.send('Debugger.setSkipAllPauses', {skip: true});

browser.on('console', msg => console.log('PAGE LOG:', msg.text()));

await session.send('Runtime.runIfWaitingForDebugger');