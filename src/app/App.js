import React, {useState} from 'react';
import axios from 'axios';
import {zodResolver} from "@hookform/resolvers/zod";
import { z } from 'zod';
import {useForm} from "react-hook-form";
import "./App.css";

const schema = z.object({
    url: z.string().url(),
});

export default function URLShortener() {
    const { register, handleSubmit} = useForm({
        resolver: zodResolver(schema)
    });

    const [inputURL, setInputURL] = useState('');
    const [shortenedURL, setShortenedURL] = useState('');

    const handleChange = (event) => {
        setInputURL(event.target.value);
    };

    const onSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/shorten-url', {
                url: inputURL
            });
            console.log(response.data.result_url);
            setShortenedURL(response.data.result_url);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("url")}
                    type="url"
                    value={inputURL}
                    onChange={handleChange}
                />
                <button type="submit">Скоротити</button>
            </form>
            {shortenedURL && (
                <div>
                    <p>Скорочений URL:</p>
                    <a href={shortenedURL} target="_blank" rel="noopener noreferrer">{shortenedURL}</a>
                </div>
            )}
        </>
    );
};