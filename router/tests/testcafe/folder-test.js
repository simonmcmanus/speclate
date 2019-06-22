
import { Selector } from 'testcafe'

const container = Selector('#container')

fixture`Url with folder strcture`
  .page`http://localhost:5004/slides/bacon.html`

test('it should render the info using the folder stcture url', async t => {
  await t
    .wait(500)
    .expect(container.textContent).eql('bacon is great')
})
