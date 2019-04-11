import { connect } from 'react-redux'
import Formol, { Field } from 'formol'
import React from 'react'

import { mergeItem } from './actions'

@connect(
  state => ({
    item: state.item,
  }),
  dispatch => ({
    handleMergeItem: (item, oldItem, names) => {
      // Dispatch a diff to be merged
      const diff = names.reduce((o, key) => {
        if (item[key] !== oldItem[key]) {
          o[key] = item[key]
        }
        return o
      }, {})
      dispatch(mergeItem(diff))
    },
  })
)
export default class UpdateForm extends React.PureComponent {
  render() {
    const { item, handleMergeItem } = this.props
    return (
      <article>
        <Formol item={item} onSubmit={handleMergeItem}>
          <Field>Name</Field>
          <Field type="number">Value</Field>
        </Formol>
        <div>
          <h3>Item</h3>
          <dl>
            <dt>Name</dt>
            <dd>
              <pre>{item.name || '∅'}</pre>
            </dd>
            <dt>Value</dt>
            <dd>
              <pre>{item.value || '∅'}</pre>
            </dd>
          </dl>
        </div>
      </article>
    )
  }
}
