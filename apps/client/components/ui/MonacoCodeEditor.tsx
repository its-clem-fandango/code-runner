import React from 'react'
import { useState } from 'react'
import { socket } from '@/components/ui/socket'
import { Editor } from '@monaco-editor/react'
import '../../app/globals.css'

const files = {
  'script.js': {
    name: 'script.js',
    language: 'javascript',
    value: 'let number = 5',
  },
}

export default function MonacoCodeEditor() {
  const [fileName, setFileName] = useState('script.js')
  const file = files[fileName]
  const [code, setCode] = useState('')
  const [recievedCode, setRecievedCode] = useState('')
  const roomName = 1
  const handleReadOnlyEditorMouseDown = (event) => {
    event.preventDefault()
  }

  /* const handleEditorChange = (newValue) => {
    setCode(newValue)
    sendMessage(newValue)
  }

  const sendMessage = (code) => {
    console.log(`EMIT MSG:`, code)
    socket.emit('chat message', { room: roomName, message: code })
  }
  socket.emit('join room', roomName)
  socket.on('chat message', (msg) => {
    console.log(`This is the message: ${msg}`)
    setRecievedCode(msg)
    console.log(`This is recieved: ${recievedCode}`)
  }) */

  return (
    <>
      <div className='container'>
        <button
          disabled={fileName === 'script.js'}
          onClick={() => setFileName('script.js')}
          className='btn-top'
        >
          script.js
        </button>
        <div className='editors-container'>
          <Editor
            height='60vh'
            width='40vw'
            theme='vs-dark'
            className='editor'
            path={file.name}
            defaultLanguage={file.language}
            //onChange={handleEditorChange}
          />

          <Editor
            height='60vh'
            width='40vw'
            theme='vs-dark'
            defaultLanguage={file.language}
            value={recievedCode}
            options={{
              readOnly: true,
            }}
            onMouseDown={handleReadOnlyEditorMouseDown}
            className='read-only-editor editor'
          />
        </div>
        <div>
          <h2>Editor Value:</h2>
          <pre>{code}</pre>
          <button>Submit</button>
        </div>
      </div>
    </>
  )
}
