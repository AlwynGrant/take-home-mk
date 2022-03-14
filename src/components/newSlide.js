import { useEffect, useReducer, useState } from 'react';
import './styles/newSlide.css'

function NewSlide(props) {
    const [name, setName] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [presentationDate, setPresentationDate] = useState('')
    const [companyLogo, setCompanyLogo] = useState('') // clearbit

    const handleSubmit = () => {
        let requests = [{
            createSlide: {
                layoutPlaceHolder: {

                }
            }
        }];

        window.gapi.client.slides.presentations.batchUpdate({
            presentationId: '1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc',
            requests: requests
        }).then((res) => {
            console.log(`Created slide with ID: ${res.result.replies[0].createSlide.objectId}`)
        })
    }

    return (
            <div className='slide-form'>
                Create new Slide
                <input
                    value={name}
                    placeholder={"Name"}
                    maxLength={50}
                    className='form name'
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <input
                    value={jobTitle}
                    placeholder={"Job Title"}
                    maxLength={50}
                    className='form job-title'
                    onChange={(e) => setJobTitle(e.target.value)}
                ></input>
                <input
                    value={companyName}
                    placeholder={"Company Name"}
                    maxLength={100}
                    className='form company-name'
                    onChange={(e) => setCompanyName(e.target.value)}
                ></input>
                <input
                    value={presentationDate}
                    placeholder={"Date of Presentation"}
                    maxLength={50}
                    className='form presentation-date'
                    onChange={(e) => setPresentationDate(e.target.value)}
                ></input>
                <input
                    value={companyLogo}
                    placeholder={"COMPANY_LOGO TO BE ADDRESSED"}
                    className='form company-logo'
                    onChange={(e) => setCompanyLogo(e)}
                ></input>
                <button
                    className='form btn'
                    type='button'
                    onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
    );
}

export default NewSlide;
