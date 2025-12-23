import React from 'react';
import './about.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About Voice Clone Project</h1>
                
                <section className="about-section">
                    <h2>What is Voice Clone?</h2>
                    <p>
                        Voice Clone is an innovative application that allows users to clone and 
                        synthesize voices with advanced AI technology. Create natural-sounding 
                        speech from text using custom voice profiles.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Features</h2>
                    <ul>
                        <li>Voice cloning from audio samples</li>
                        <li>Text-to-speech synthesis</li>
                        <li>Multiple language support</li>
                        <li>High-quality audio output</li>
                        <li>Easy-to-use interface</li>
                    </ul>
                </section>

                <section className="about-section">
                    <h2>How It Works</h2>
                    <p>
                        Our platform uses machine learning algorithms to analyze voice patterns 
                        and create accurate voice clones. Simply upload a voice sample, and our 
                        system will learn the unique characteristics to generate natural-sounding speech.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Contact Us</h2>
                    <p>Have questions? We'd love to hear from you at support@voiceclone.com</p>
                </section>
            </div>
        </div>
    );
};

export default About;