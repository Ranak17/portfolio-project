import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ValidationError from './ValidationError';

export default function TestErrors() {
    const baseUrl = 'http://localhost:5101/api/';
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'Buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Button variant='outline-success' onClick={handleNotFound}>Not Found</Button>
            <Button variant='outline-success' onClick={handleBadRequest} >Bad Request</Button>
            <Button variant='outline-success' onClick={handleValidationError}>Validation Error</Button>
            <Button variant='outline-success' onClick={handleServerError}>Server Error</Button>
            <Button variant='outline-success' onClick={handleUnauthorised}>Unauthorised</Button>
            <Button variant='outline-success' onClick={handleBadGuid} >Bad Guid</Button>
            {errors && <ValidationError errors={errors} />}
        </>
    )
}
