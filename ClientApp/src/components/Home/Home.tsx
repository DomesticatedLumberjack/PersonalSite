import React, { useEffect, useState } from 'react';
import { Fade, ListGroup } from 'react-bootstrap';
import { sleep } from '../../Tools/Sleep';

export const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);

  const sleepFadeIn = async () => {
    await sleep(200);
    setFadeIn(true);
  }

  useEffect(() => {
    sleepFadeIn();
  }, [])

  return (
    <div>
      <h1>Hello, there!</h1>
      <ul/>
      <Fade in={fadeIn}>
        <p style={{fontSize: '20px'}}>My name is Tyler and I'm a developer currently based in Portland, OR. When I'm not behind my keyboard you can usually find me outside taking pictures of trees or attempting to get my hands to cooperate with me on an instrument. Feel free to view my blog for current projects and updates.
        </p>
      </Fade>
      <ul/>
      <h3 style={{marginTop: '50px', textAlign: 'center'}}>Contact</h3>
      <Fade in={fadeIn} >
        <ListGroup style={{width: '300px', textAlign: 'center', marginTop: '20px', marginLeft: 'auto', marginRight: 'auto'}}>
          <ListGroup.Item>
            Email: tyler.j.mire@gmail.com
          </ListGroup.Item>
          <ListGroup.Item>
            Twitter: <a href="https://twitter.com/RudimentalRadio/">RudimentalRadio</a>
          </ListGroup.Item>
          <ListGroup.Item>
            Instagram: <a href="https://www.instagram.com/reflectivemire/">reflectivemire</a>
          </ListGroup.Item>
        </ListGroup>
      </Fade>
    </div>
  );
}
