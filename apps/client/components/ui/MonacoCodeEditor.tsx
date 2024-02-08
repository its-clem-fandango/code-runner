"use client";

import React, { ReactHTMLElement, MouseEvent, ChangeEvent } from "react";
import { useState, useEffect } from "react";
import { socket } from "@/components/ui/socket";
import { Editor } from "@monaco-editor/react";
import "../../app/globals.css";

interface File {
  name: string;
  language: string;
  value: string;
}

export default function MonacoCodeEditor() {

  const [code, setCode] = useState<string | undefined>("");
  const [recievedCode, setRecievedCode] = useState<string>("");
  const [playerNumber, setPlayerNumber] = useState<number>(1);
  const [answerToChallenge, setAnswerToChallenge] = useState(null);
  const [submitMessage, setSubmitMessage] = useState<string>('')

  const roomName = 1;
  const files = {
    name: "script.js",
    language: "javascript",
    value: "let number = 5",
  };
  const file: File = files;

  const handleEditorChange = (code: string | undefined) => {
    setCode(code);
    sendMessage(code);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("submit", {
      room: roomName,
      player: playerNumber,
      message: code,
      challengeId: 1,
    });
  };

  const sendMessage = (code: string | undefined) => {
    // console.log(`Emitting message:`, code);
    socket.emit("codeChanged", {
      room: roomName,
      player: playerNumber,
      message: code,
    });
  };

  useEffect(() => {

    socket.on("testResult", (answer) => {
      if (answer.message) {
        setSubmitMessage(answer.message)
        return
      }
      if (answer.didAssertPass === false) {
        setSubmitMessage(answer.testResults[0].error)
        return
      }
      setSubmitMessage('Success: All tests passed!')
    });
  }, [])


  useEffect(() => {
    socket.on("opponentCode", (msg) => {
      if (msg.player !== playerNumber) {
        console.log(`This is the message: ${msg.message}`);
        setRecievedCode(msg.message);
        console.log(`This is recieved: ${recievedCode}`);
      }
    });
  }, [playerNumber]);
  socket.emit("join room", roomName);

  return (
    <>
      <div className="container">
        <h3 className="btn-top">
          script.js
        </h3>
        <button
          onClick={() =>
            playerNumber === 1 ? setPlayerNumber(2) : setPlayerNumber(1)
          }
        >
          Change Player
        </button>
        <p>{playerNumber}</p>
        <div className="editors-container">
          <Editor
            height="60vh"
            width="40vw"
            theme="vs-dark"
            path={file.name}
            defaultLanguage={file.language}
            onChange={(value: string | undefined) => handleEditorChange(value)}
          />

          <Editor
            height="60vh"
            width="40vw"
            theme="vs-dark"
            defaultLanguage={file.language}
            value={recievedCode}
            options={{
              readOnly: true,
            }}
            className="read-only-editor editor"
          />
        </div>
        <div>
          {/* <h2>Editor Value:</h2> */}
          {/* <pre>{code}</pre> */}
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <br />
        <div>
          <h3>
            {submitMessage !== '' ? submitMessage : null}
          </h3>
        </div>
      </div>
    </>
  );
}
