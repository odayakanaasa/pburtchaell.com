import React from 'react';
import Dribbble from 'work/components/dribbble';
import Section from 'work/components/section';
import Availability from 'work/components/availability';

React.initializeTouchEvents(true); // React configurations

window.React = React; // for React developer tools

let WorkView = React.createClass({

  componentDidMount() {
    this.refs.dribbble.getShots(); // Load latest dribbble shots
  },

  getInitialState() {
    return {
      openSourceProjects: [
        {
          key: 1,
          title: 'assemble-middleware-rss',
          link: 'https://github.com/assemble/assemble-middleware-rss',
          description: 'RSS feed middleware for Assemble.'
        },
        {
          key: 2,
          title: 'react-input',
          link: 'https://github.com/pburtchaell/react-input',
          description: 'React input element.'
        },
        {
          key: 3,
          title: 'react-classes',
          link: 'https://github.com/pburtchaell/react-classes',
          description: 'Wrapper for the React class add-on.'
        },
        {
          key: 4,
          title: 'generator-helper',
          link: 'https://github.com/assemble/generator-helper',
          description: 'Yeoman generator for Handlebars and Lodash helpers.'
        }
      ],
      projects: [
        {
          key: 1,
          title: 'Segment',
          link: 'http://segment.social',
          type: 'Full stack development & user interface design',
        }
      ]
    };
  },

  render() {
    return  (
      <div>

        <Section name="hero">
          <div className="work-hero-wrapper">
            <hgroup>
              <h1 className="work-page-title">Patrick Burtchaell</h1>
              <small>
                <h4 className="work-page-subtitle">
                  <b>Designer and web developer from New Orleans</b>
                </h4>
              </small>
            </hgroup>
          </div>
          <div className="work-hero-background"></div>
        </Section>

        <Section name="availability">
          <div className="row">
            <div className="col col-l-12 col-s-12">
              <h4>My Availability</h4>
              <small><h4><b>January&ndash;Decemeber 2015</b></h4></small>
              <Availability />
            </div>
          </div>
        </Section>

        <Section name="about">
          <div className="row row-large">
            <div className="col col-l-12 col-s-12">
            <h4><b>I aim to build successful products for the future</b></h4>
              <p>I am currently an honors student at Loyola University New Orleans studying design and computer science. I work as a remote junior front end web developer with Peach, where we are making the experience of buying a warranty better.</p>
              <p>If you would like to say hello, please <a href="mailto:patrick@pburtchaell.com" className="line">feel free to send me an email</a> or a <a href="http://twitter.com/purtchaell" className="line">Tweet</a>.</p>
            </div>
          </div>
        </Section>

        <Section name="projects">
          <div className="row row-large">
            <div className="col col-l-6 col-s-12">
              <h4>Open Source Projects</h4>
              <small><h4><b>GitHub and npm</b></h4></small>
              <ul className="project-list">
                {this.state.openSourceProjects.map(item =>
                  <li
                    key={item.key}
                    className="project-list-item"
                    data-type="open-source">
                      <a href={item.link} target="_blank">
                        <div className="list-item-title">{item.title}</div>
                        <div className="list-item-desciption">{item.description}</div>
                      </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="col col-l-6 col-s-12">
              <h4>Side Projects</h4>
              <small><h4><b>Web development and design</b></h4></small>
              <ul className="project-list">
                {this.state.projects.map(item =>
                  <li
                    key={item.key}
                    className="project-list-item"
                    data-type="side-project">
                      <a href={item.link} target="_blank">
                        <div className="list-item-title">{item.title}</div>
                        <div className="list-item-categories">Categories: {item.type}</div>
                        <div className="list-item-desciption">Description: {item.description}</div>
                      </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Section>

        <Section name="images">
          <Dribbble ref="dribbble" {...this.state} />
        </Section>

        <Section name="availability">
          <div className="row">
            <div className="col col-l-12 col-s-12">
              <h4>Works</h4>
              <a href="/works" className="btn btn-white">Sign In</a>
              <small><h4><b>Access to my portfolio may be granted upon request.</b></h4></small>
            </div>
          </div>
        </Section>

      </div>
    );
  }

});

React.render(
  <WorkView/>,
  document.querySelector('main'),
  function () {
  }
);
