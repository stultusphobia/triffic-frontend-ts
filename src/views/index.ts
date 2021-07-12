import Home from './Home'
import About from './About'
import AttractionSelector from './AttractionSelector'

export default [
  { component: Home, text: 'Home', to: '/' , exact: true },
  { component: About, text: 'About', to: '/about', exact: false },
  { component: AttractionSelector, text: 'Attraction Selector', to: '/attraction-selector', exact: false },
]
