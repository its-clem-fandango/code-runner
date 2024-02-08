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
  const [fileName, setFileName] = useState<string>("script.js");
  const [code, setCode] = useState<string | undefined>("");
  const [recievedCode, setRecievedCode] = useState<string>("");
  const [playerNumber, setPlayerNumber] = useState<number>(1);
  const [answerToChallenge, setAnswerToChallenge] = useState({});

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
    listenToAnswer();
  };

  const sendMessage = (code: string | undefined) => {
    console.log(`Emitting message:`, code);
    socket.emit("codeChanged", {
      room: roomName,
      player: playerNumber,
      message: code,
    });
  };

  const listenToAnswer = () => {
    socket.on("testResult", (answer) => {
      console.log("answer", answer);
      setAnswerToChallenge(answer);
      console.log(`Printing the state`, answerToChallenge.didAssertPass);
    });
  };

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

  console.log("answerToChallenge", answerToChallenge);
  console.log("true or false", answerToChallenge ? "true" : "false");

  return (
    <>
      <div className="container">
        <button
          disabled={fileName === "script.js"}
          onClick={() => setFileName("script.js")}
          className="btn-top"
        >
          script.js
        </button>
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
          {answerToChallenge.didAssertPass ? (
            <h3>
              {answerToChallenge.didAssertPass
                ? " Response : SUCCESS"
                : " Response: Try Again"}
            </h3>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
