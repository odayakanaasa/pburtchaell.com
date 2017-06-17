import React, { Element, Children } from 'react';
import { Link } from 'react-router-dom';
import Column from '../../components/column';
import Text, { types as textTypes } from '../../components/text';
import Row from '../../components/row';
import HireMe from '../../components/hire';
import SocialLinks from '../../components/socialLinks';
import RouteContainer from '../../components/routeContainer';
import content from './content.json';

type Props = {
  config: Object
};

const AboutRoute = (props: Props): Element<*> => (
  <RouteContainer {...props.config}>
    <Row>
      <Text style={{
        marginTop: '0'
      }}>{"I'm"} a senior student at <a href="http://cmfa.loyno.edu/design" title="Loyola University New Orleans Department of Design">Loyola University New Orleans</a> and a product design intern at <a href="http://facebook.design/" title="Facebook Design">Facebook</a>.</Text>
    </Row>
    <Row size="medium">
      <figure className="figure">
        <img
          className="image image-large"
          src={require('./hero.jpg')}
        />
      </figure>
    </Row>
    <Row>
      {Children.toArray(content.intro.map(paragraph => (
        <Text>{paragraph}</Text>
      )))}
      <hr />
      <Text type={textTypes.SMALL}>
        Last Updated &mdash; {content.lastUpdated}
      </Text>
    </Row>
    <div className="padding padding-small" />
    <Row size="large">
      <Column largeSize={6} smallSize={12}>
        <h3>Clients &amp; Companies</h3>
        <ul>
          {Children.toArray(content.companies.map(company => (
            <li>{company}</li>
          )))}
        </ul>
      </Column>
      <Column largeSize={6} smallSize={12}>
        <h3>Personal Projects</h3>
        <ul>
          {Children.toArray(content.personalProjects.map(project => (
            <li>
              <a href={project.path} title={project.title}>
                {project.title}
              </a>
            </li>
          )))}
        </ul>
      </Column>
      <Column largeSize={6} smallSize={12}>
        <h3>Connect</h3>
        <SocialLinks />
      </Column>
      <Column largeSize={6} smallSize={12}>
        <h3>Open Source Projects</h3>
        <ul>
          {Children.toArray(content.openSourceProjects.map(project => (
            <li>
              <a href={project.path} title={project.title}>
                {project.title}
              </a>
            </li>
          )))}
        </ul>
      </Column>
    </Row>
    <Row size="large">
      <HireMe />
    </Row>
  </RouteContainer>
);

export default AboutRoute;
