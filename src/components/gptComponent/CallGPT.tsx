import { Box, TextareaAutosize, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendResult } from '../../api/slices/componentsSlice';
import { RootState } from '../../api/store';
import { AppDispatch } from '../../api/store';
import { gptCall } from '../../api/slices/gptSlice';
import './callGPT.css';
import { PrimaryButton } from '../Buttons/PrimaryButton';

interface ServerResponse {
  message: string;
}

export function CallGPT() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const gptResponse = useSelector((state: RootState) => state.gptCall.message);
  const [parsedData, setParsedData] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleFetchData = () => {
    dispatch(gptCall(input));
  };

  const handleSendResult = () => {
    if (gptResponse) {
      dispatch(sendResult(gptResponse));
    }
  };

  useEffect(() => {
    if (gptResponse) {
      console.log(gptResponse);
      
      const formattedResponse = gptResponse
        .split('\n')  // Разбиваем текст на массив строк
        .map(line => line.replace(/: [\w-]+$/, ''))  // Удаляем ID с каждой строки
        .join('\n');  // Соединяем строки обратно в текст с переносами строк
      setParsedData(formattedResponse);
    }
  }, [gptResponse]);

  return (
    <div className="container">
      <div className="header">Assistant Help</div>
      <Box className="inputContainer">
        <TextField
          fullWidth
          label="Enter the prompt"
          value={input}
          onChange={handleInput}
          InputProps={{
            style: { borderRadius: '25px' }
          }}
        />
        <PrimaryButton
          text={'Send'}
          label={'send'}
          onClick={handleFetchData}
          color={'green'}
        />
      </Box>
      <Box className="outputContainer">
        <TextareaAutosize
          aria-label="maximum height"
          minRows={10}
          placeholder="Assistant output"
          value={parsedData}
          className="textarea"
        />
        <PrimaryButton
          text={'Try Configuration'}
          label={'Try configuration'}
          onClick={handleSendResult}
          color={'orange'}
        />
      </Box>
    </div>
  );
}
