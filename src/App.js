import 'formol/lib/default.css'

import './App.css'

import React from 'react'

import ComplexForm from './ComplexForm'
import CreationForm from './CreationForm'
import UpdateForm from './UpdateForm'

export default class App extends React.PureComponent {
  render() {
    return (
      <main>
        <header>
          <h1>Welcome to the formol starter pack</h1>
        </header>
        {process.env.NODE_ENV === 'production' && (
          <aside>
            You can check the bundle size of this starter pack{' '}
            <a href="report.html" target="_blank" rel="noopener noreferrer">
              here
            </a>
            .
          </aside>
        )}
        <section>
          <header>
            <h2>A simple creation form</h2>
          </header>
          <CreationForm />
        </section>
        <section>
          <header>
            <h2>An edition form</h2>
          </header>
          <UpdateForm />
        </section>
        <section>
          <header>
            <h2>A complex form with external components</h2>
          </header>
          <article>
            <ComplexForm />
          </article>
        </section>
      </main>
    )
  }
}
