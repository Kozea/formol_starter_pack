import { connect } from 'react-redux'
import Formol, { Field } from 'formol'
import React from 'react'

import { setSimpleItem } from './actions'

@connect(
  state => ({
    simpleItem: state.simpleItem,
  }),
  dispatch => ({
    handleSetItem: item => {
      dispatch(setSimpleItem(item))
    },
  })
)
export default class CreationForm extends React.PureComponent {
  render() {
    const { simpleItem, handleSetItem } = this.props
    return (
      <article>
        <Formol onSubmit={handleSetItem}>
          <Field>Name</Field>
          <Field type="number">Value</Field>
        </Formol>
        <div>
          <h3>Item</h3>
          <dl>
            <dt>Name</dt>
            <dd>
              <pre>{simpleItem.name || '∅'}</pre>
            </dd>
            <dt>Value</dt>
            <dd>
              <pre>{simpleItem.value || '∅'}</pre>
            </dd>
          </dl>
        </div>
      </article>
    )
  }
}
