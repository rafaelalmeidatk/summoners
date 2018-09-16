import React from 'react'
import { Form, Button, FormGroup, FormFeedback, Label, Input } from 'reactstrap'
import { withFormik } from 'formik'

import yup from '../lib/yup'
import RiotApi, { regionNamesByCode } from '../lib/riotApi'

const formikEnhancer = withFormik({
  validationSchema: yup.object().shape({
    summonerName: yup.string().required('The summoner name is required'),
  }),
  mapPropsToValues: props => ({
    regionCode: 'NA1',
    summonerName: '',
  }),
  handleSubmit: (values, { props, setStatus, setSubmitting }) => {
    const { regionCode, summonerName } = values

    RiotApi.findSummonerByName(regionCode, summonerName)
      .then(res => {
        const { data } = res
        props.onSummonerData(regionCode, data)
      })
      .catch(error => {
        console.log('error!', error)
        // TODO: handle it
        setSubmitting(false)
      })
  },
})

const SummonerSearchForm = props => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting } = props

  const getErrors = param => {
    return errors[param] && touched[param] ? errors[param] : ''
  }

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="regionCode">Select your region</Label>
        <Input
          type="select"
          name="regionCode"
          id="regionCode"
          invalid={!!getErrors('regionCode')}
          value={values.regionCode}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {Object.keys(regionNamesByCode).map(key => (
            <option key={key} value={key}>
              {regionNamesByCode[key]}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="summonerName">Type your summoner name</Label>

        <Input
          id="summonerName"
          type="text"
          name="summonerName"
          invalid={!!getErrors('summonerName')}
          value={values.summonerName}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <FormFeedback>{getErrors('summonerName')}</FormFeedback>
      </FormGroup>

      <Button type="submit" color="primary" onClick={this.handleSearch} disabled={isSubmitting}>
        Search
      </Button>
    </Form>
  )
}

export default formikEnhancer(SummonerSearchForm)
