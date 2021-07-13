import Home from './Home'
import About from './About'
import AttractionSelector from './AttractionSelector'
import BlankCanvas from './BlankCanvas'

export default [
  { component: Home, text: 'Home', to: '/' , exact: true },
  { component: About, text: 'About', to: '/about', exact: false },
  { component: AttractionSelector, text: 'Attraction Selector', to: '/attraction-selector', exact: false },
  { component: BlankCanvas, text: 'Blank-Canvas', to: '/blank-canvas', exact: false },
]
