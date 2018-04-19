import React from 'react'
import ReactDOM from 'react-dom'
import * as utilsMock from '../../utils/api'
import Editor from '../editor'

jest.mock('../../utils/api', () => {
  return {
    posts: {
      create: jest.fn(() => Promise.resolve()),
    },
  }
})

const flushPromises = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}

test('calls onSubmit with the username and password when submitted', async () => {
  const container = document.createElement('div')
  const fakeUser = {id: 'fakeUser'}
  const fakeHistory = {
    push: jest.fn(() => {}),
  }

  ReactDOM.render(<Editor history={fakeHistory} user={fakeUser} />, container)

  const form = container.querySelector('form')
  const {title, content, tags} = form.elements
  title.value = 'A'
  content.value = 'B'
  tags.value = 'a,   b      ,c '

  const submit = new window.Event('submit')
  form.dispatchEvent(submit)

  await flushPromises()

  expect(fakeHistory.push).toHaveBeenCalledTimes(1)
  expect(fakeHistory.push).toHaveBeenCalledWith('/')
  expect(utilsMock.posts.create).toHaveBeenCalledTimes(1)
  expect(utilsMock.posts.create).toHaveBeenCalledWith({
    authorId: fakeUser.id,
    title: title.value,
    content: content.value,
    tags: ['a', 'b', 'c'],
    date: expect.any(String),
  })

  // Arrange
  // create a fake user, post, history, and api
  //
  // use ReactDOM.render() to render the editor to a div
  //
  // fill out form elements with your fake post
  //
  // Act
  // submit form
  //
  // wait for promise to settle
  //
  // Assert
  // ensure the create function was called with the right data
})

// TODO later...
// test('snapshot', () => {})
