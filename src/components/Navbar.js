import React from 'react'
import Link from 'gatsby-link'

import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const Navbar = () => (
  <nav>
    <div>
      <div>
        <Link to="/">
          <figure>
            <img src={logo} alt="Kaldi" />
          </figure>
        </Link>
      </div>
      <div>
        <Link>About</Link>
        <Link>Products</Link>
      </div>
      <div>
        <a
          href="https://github.com/AustinGreen/gatsby-netlify-cms-boilerplate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>
            <img src={github} alt="Github" />
          </span>
        </a>
      </div>
    </div>
  </nav>
)

export default Navbar
