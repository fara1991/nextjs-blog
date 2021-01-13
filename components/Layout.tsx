import Scroll from 'react-scroll';
import Head from 'next/head';
import Link from 'next/link';
import {
	Button,
	Card,
	Col,
	Container,
	Image,
	Modal,
	Nav,
	Navbar,
	Row,
} from 'react-bootstrap';
import {useState} from 'react';
import Profile from './Profile';

function Top() {
	Scroll.animateScroll.scrollToTop();
}

const Layout = (props) => {
	const siteTitle = "Fara's Blog";
	const [showSideBar, stateSideBar] = useState(false);
	const show = () => stateSideBar(true);
	const hide = () => stateSideBar(false);

	return (
		<div className='page screen'>
			<Head>
				<title>
					{props.title ? `${props.title} | ${siteTitle}` : siteTitle}
				</title>
				<link rel='icon' href='/logo.png'/>
			</Head>

			<div className='sticky-top border-bottom bg-light'>
				<Navbar expand='lg'>
					<Navbar.Brand>
						<Image
							src='/logo.png'
							width={32}
							height={32}
							alt='React Bootstrap Logo'
							className='text-left'
						/>
						<Link href='/'>
							<a>
								{siteTitle}
							</a>
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive' onClick={show}/>
					<Modal show={showSideBar} onHide={hide}>
						<Modal.Header closeButton>
							<Modal.Title>Category</Modal.Title>
						</Modal.Header>
						<Modal.Body className='category'>
							<Link href='/'>
								<a>home</a>
							</Link>
							{props.categoryList.map((category) => (
								<div key={category}>
									{' └ '}
									<Link key={category} href='/[category]' as={`/${category}`}>
										<a>{category}</a>
									</Link>
								</div>
							))}
						</Modal.Body>
					</Modal>
				</Navbar>
				<Nav className='justify-content-around display-pc category m-2'>
				  <Link href='/'>
				    <a>home</a>
				  </Link>
				  {props.categoryList.map((category) => (
				    <Link key={category} href='/[category]' as={`/${category}`}>
				      <a>{category}</a>
				    </Link>
				  ))}
				</Nav>
			</div>
			<Card.Body>
				<Container fluid>
					<Row>
						<Col sm='2'/>
						<Col sm='7'>{props.children}</Col>
						<Col sm='3'><Profile/></Col>
					</Row>
				</Container>
				{/* Top Scroll Button */}
                <Button onClick={Top} id='scroll-top' variant='info'>∧</Button>
			</Card.Body>
			<Card.Footer className='text-center border-top footer'>
				&copy; 2020 created by{' '}
				<a href='https://twitter.com/game_Fara' target='_blank' rel='nofollow noopener norefferer'>
					Fara
				</a>
			</Card.Footer>

			<style jsx global>{`
				html,
				body {
					padding: 0;
					margin: 0;
					font-family: 'Domine', serif;
					color: #222;
				}

				img,
				iframe {
					max-width: 100%;
				}

				.category {
					font-family: 'Cinzel', serif;
				}

				// width > 760のみ表示
				@media only screen and (max-width: 760px) {
					.display-pc {
						display: none;
					}
				}

				.screen {
					display: flex;
					flex-direction: column;
					min-height: 100vh;
				}

				img[src*='#center'] {
					display: block;
					margin: auto;
				}
				
				#scroll-top {
					position: fixed;
					bottom: 8%;
					right: 5%;
					border-radius: 100%;
					width: 2.8rem;
					height: 2.8rem;
				}
				
				p {
					margin: 1rem 0;
				}
				
				* {
					box-sizing: border-box;
				}
			`}</style>
		</div>
	);
};

export default Layout;
