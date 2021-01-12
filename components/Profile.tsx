import {Card, Image} from 'react-bootstrap';

const Profile = () => {
  const name = 'Fara';
  const twitterLink = 'https://twitter.com/game_Fara';
  const twitchLink = 'https://twitch.tv/game_Fara';
  const gitlabLink = 'https://gitlab.com/game_Fara';
  const marshmallowLink = 'https://marshmallow-qa.com/game_Fara';
  const target = '_blank';
  const rel = 'nofollow noopener norefferer';

  return (
    <Card className='mb-2'>
      <Card.Header>Profile</Card.Header>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>(｀･ω･´)(｀･ω･´)(｀･ω･´)</Card.Subtitle>
        {/* icon */}
        <Card.Body className='text-center'>
          {' '}
          <a href={twitterLink} target={target} rel={rel}>
            <Image height={32} width={32} src='/icons/twitter.png' />
          </a>{' '}
          <a href={twitchLink} target={target} rel={rel}>
            <Image height={32} width={32} src='/icons/twitch.png' />
          </a>{' '}
          <a href={gitlabLink} target={target} rel={rel}>
            <Image height={32} width={32} src='/icons/gitlab.png' />
          </a>{' '}
          <a href={marshmallowLink} target={target} rel={rel}>
            <Image height={32} width={32} src='/icons/marshmallow.png' />
          </a>{' '}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

export default Profile;
