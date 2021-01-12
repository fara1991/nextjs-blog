import React from 'react';
import useDarkMode, {DarkMode} from 'use-dark-mode';
import {Card, Container, Image} from "react-bootstrap";
import Switch from 'react-switch';

const switchMode = () => {
	const darkMode: DarkMode = useDarkMode(false);
	return (
		<Card.Body>
			<Container className='text-right'>
				<span>Mode: </span>
				<Switch
					checked={darkMode.value}
					onChange={darkMode.toggle}
					uncheckedIcon={
						<Image src="/icons/sun.png" className="react-switch"/>
					}
					checkedIcon={
						<Image src="/icons/moon.png" className="align-content-center"/>
					}
				/>
			</Container>
			<style jsx global>{`				
				body.light-mode {
					background-color: #fff;
					color: #777;
					transition: background-color 0.3s ease;
				}
				body.dark-mode {
					background-color: #2F2F2F;
					color: #AAA;
				}
			`}</style>
		</Card.Body>
	)
}

export default switchMode;