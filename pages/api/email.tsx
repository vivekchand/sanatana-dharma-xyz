import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface EmailProps {
  message: string;
  preview: string;
  unsubscribe_link: string
}

export const Email = ({
  message = 'the message',
  preview = 'the preview',
  unsubscribe_link = "unsubscribe link",
}: EmailProps) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Hr style={hr} />
          <div
            style={paragraph}
            dangerouslySetInnerHTML={{ __html: message }}
          />
          <Hr style={hr} />
          <Text style={footer}>
            SanatanaDharma.xyz
            <br/><br/>
            <Link href={unsubscribe_link} style={footerLink} target="_blank">Unsubscribe</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default Email;

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline',
};

const main = {
  backgroundColor: '#f9f4f0',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#f9f4f0',
  margin: '0 auto',
  padding: '10px 0 10px',
  marginBottom: '64px',
};

const box = {
  padding: '0 28px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const anchor = {
  color: '#556cd6',
};

const button = {
  backgroundColor: '#656ee8',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
