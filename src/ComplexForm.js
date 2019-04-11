import { connect } from 'react-redux'
import Formol, { Field, Inliner, Conditional } from 'formol'
import React from 'react'

import { setComplexItem } from './actions'

@connect(
  state => ({
    complexItem: state.complexItem,
  }),
  dispatch => ({
    handleSetItem: item => {
      dispatch(setComplexItem(item))
    },
  })
)
export default class ComplexForm extends React.PureComponent {
  render() {
    const { complexItem, handleSetItem } = this.props
    return (
      <article>
        <Formol
          item={complexItem}
          validator={({ firstname, lastname }) => ({
            firstname:
              (firstname ? firstname.length : 0) +
                (lastname ? lastname.length : 0) <=
              6
                ? 'Your full name must be greater than 6 characters.'
                : null,
          })}
          // eslint-disable-next-line no-alert
          onSubmit={handleSetItem}
        >
          <Field name="firstname" required>
            First Name
          </Field>
          <Field name="lastname" required minLength={3}>
            Last Name
          </Field>
          <Field
            name="birth"
            type="calendar"
            validator={v =>
              new Date(v) < new Date('1950-01-01') ? 'You can’t be too old' : ''
            }
          >
            Day of birth
          </Field>
          <Inliner>
            <Field name="address.zip" size={5}>
              Zip code
            </Field>
            <Conditional readOnly={({ address: { zip } }) => !zip}>
              <Field name="address.city">City</Field>
            </Conditional>
          </Inliner>
          <Field
            name="address.continent"
            type="select-menu"
            choices={[
              'Africa',
              'Antarctica',
              'Asia',
              'Europe',
              'North America',
              'Australia/Oceania',
              'South America',
            ]}
          >
            Continent
          </Field>
          <Conditional
            show={({ address: { continent } }) =>
              ['Asia', 'North America', 'South America'].includes(continent)
            }
          >
            <Field
              name="fastShipping"
              type="switch"
              title="Fast shipping includes an extra cost"
            >
              Fast shipping
            </Field>
          </Conditional>
          <Conditional
            value={({
              firstname,
              lastname,
              address: { zip, city, continent },
            }) =>
              (firstname ? firstname.length : 0) +
              (lastname ? lastname.length : 0) +
              (zip ? zip.length : 0) +
              (city ? city.length : 0) +
              (continent ? continent.length : 0)
            }
          >
            <Field
              name="price"
              type="money"
              title={
                'This price equals the number of letters ' +
                'in this form (because why not)'
              }
              max={100}
              disabled
              readOnly
            >
              Indicative price
            </Field>
          </Conditional>
          <Field
            name="colors"
            type="checkbox-set"
            choices={Object.entries({
              Red: '#ff0000',
              Yellow: '#ffff00',
              Olive: '#808000',
              Lime: '#00ff00',
              Green: '#008000',
              Aqua: '#00ffff',
              Teal: '#008080',
              Blue: '#0000ff',
              Navy: '#000080',
              Fuchsia: '#ff00ff',
              Purple: '#800080',
            }).map(([k, v]) => [`<div style="color: ${v};">${k}</div>`, v])}
            dangerousRawHTMLLabels
          >
            Choose some colors
          </Field>
        </Formol>
        <div>
          <h3>Item</h3>
          <dl>
            <dt>Firstname</dt>
            <dd>
              <pre>{complexItem.firstname || '∅'}</pre>
            </dd>
            <dt>Lastname</dt>
            <dd>
              <pre>{complexItem.lastname || '∅'}</pre>
            </dd>
            <dt>Birth</dt>
            <dd>
              <pre>{complexItem.birth || '∅'}</pre>
            </dd>
            <dt>Address</dt>
            <dd>
              <pre>{JSON.stringify(complexItem.address, null, 2)}</pre>
            </dd>
            <dt>Fast shipping</dt>
            <dd>
              <pre>{complexItem.fastShipping ? 'yes' : 'no'}</pre>
            </dd>
            <dt>Price</dt>
            <dd>
              <pre>{complexItem.price || '∅'}</pre>
            </dd>
            <dt>Colors</dt>
            <dd>
              <pre>{complexItem.colors.join(', ') || '∅'}</pre>
            </dd>
          </dl>
        </div>
      </article>
    )
  }
}
