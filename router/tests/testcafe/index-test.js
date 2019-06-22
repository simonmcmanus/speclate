
import { Selector } from 'testcafe'

const container = Selector('#container')

fixture`Getting Started`
  .page`http://localhost:5004`

test('load homepage', async t => {
  await t
    .expect(container.textContent).eql('home')
})

test('ensure html attributes are set', async t => {
  await t
    .expect(Selector('html').getAttribute('data-speclate-url')).eql('/index.html')
    .expect(Selector('html').getAttribute('data-speclate-page')).eql('home')
})

test('click on contact and ensure page is updated', async t => {
  await t
    .click(Selector('.contact'))
    .wait(500)
    .expect(container.textContent).eql('contact')
    .expect(Selector('html').getAttribute('data-speclate-url')).eql('/contact.html')
    .expect(Selector('html').getAttribute('data-speclate-page')).eql('contact')
})


