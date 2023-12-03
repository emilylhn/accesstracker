import React, { useState } from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #003227;
  color: white;
  height: auto;
`;

const PageTitle = styled.h1`
  font-family: 'Silk Flower', serif;
  font-size: 42px;
  margin-bottom: 20px;
`;

const MissionStatement = styled.p`
  font-size: 18px;
  margin-bottom: 35px;
  font-family: Arial, Helvetica, sans-serif;
  width: 60%;
  text-align: center;
`;


const Section = styled.div`
  width: 70%;
  margin-bottom: 20px;
  background-color: #FFF9EF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
`;

const SectionTitle = styled.h2`
  font-family: 'Silk Flower', serif;
  cursor: pointer;
  margin-bottom: 5px;
  color: #003227;
`;

const Paragraph = styled.p`
  font-size: 17px; 
  color: #003227;
  font-family: Arial, Helvetica, sans-serif;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  font-size: 16px;
  color: #003227;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
  color: #003227;
  font-family: Arial, Helvetica, sans-serif;
`;

const ExpandableSection = ({ title, intro, points }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

//   return (
//     <Section>
//       <SectionTitle onClick={toggleSection}>{isOpen ? '▼ ' : '> '}{title}</SectionTitle>
//       <Paragraph isOpen={isOpen}>{content}</Paragraph>
//     </Section>
//   );
// };

return (
    <Section>
      <SectionTitle onClick={toggleSection}>
        {isOpen ? '▼ ' : '> '}
        {title}
      </SectionTitle>
      <Paragraph>{intro}</Paragraph>
      {points && points.length > 0 && isOpen && (
        <List>
          {points.map((point, index) => (
            <ListItem key={index}>{point}</ListItem>
          ))}
        </List>
      )}
    </Section>
  );
          }

const About = () => {
  return (
    <PageContainer>
     <PageTitle>What Is Access Tracker?</PageTitle>
      <MissionStatement>
        AccessTracker is space to share your accessibility expereinces for locations you've visited. The good, the bad and the so-so, all of it can be useful to someone else. Not sure where to start with a post? Don't worry, we will walk you through some ideas too. 
      </MissionStatement>
      <ExpandableSection
        title="So... What Counts As Accessibility?"
        intro="Accessibility goes beyond 'Does this location have a ramp?' and it goes beyond just disability. It can mean this restaurant only has chairs with arms, and the menu is only available in paper-- this would make it inaccessible to people living in larger bodies and people who rely on screen readers. In the sections below, I will go over some of the things to consider for each potential tag you can use in your posts, and perhaps they will be things to think about next time you're out. Click the titles to expand each section."
        />
        <ExpandableSection
        title="Mobility"
        intro="Mobility encompasses more than just physical obstacles. It involves assessing surfaces, navigability, and the presence of aids like ramps and elevators. Think about the ease of movement for wheelchairs, walkers, or canes in the space."
        points={[
            'Does this location have flat, easy-to-walk-on surfaces? Could a cane potentially get stuck in a tile crack? Would a wheelchair have the space to move around easily?',
            'How walkable is this location? Are there benches for people who need them?',
            'Are there elevators or escalators at this location? Are they reliable or always seemingly under maintenance?',
        ]}
      />
        <ExpandableSection
        title="Vision"
        intro="The vision category dives into considerations beyond the visible. It involves assessing the availability of alternative formats for information, and accommodations for individuals who rely on auditory cues or tactile guidance."
        points={[
            'If this location has a menu, is it only available in paper or is it available online so someone could use a screen reader?',
            'Is this a location with tactile paths, or even an indoor navigation map?',
            'Do the crosswalks near this location use audio signals?',
        ]}
      />
        <ExpandableSection
        title="Hearing"
        intro="Hearing accessibility extends beyond volume levels. It includes considerations for effective communication, signage, and the presence of aids like audio signals or sign language interpreters."
        points={[
            'What is the sound level usually at this location?',
            'Are there well-indicated signs and directions in or around this location for someone who cannot hear instructions?',
            'Was anyone at this location able to use ASL or any other signing language?',
          ]}
      />
        <ExpandableSection
        title="Sensory"
        intro="Sensory considerations embrace the diverse sensory needs of individuals. This category explores factors such as noise levels, lighting conditions, and potential triggers for sensory sensitivities and overstimulation."
        points={[
            'Is this location often very busy? Or extra loud on certain days or during certain times?',
            'Are there flashing lights or intense lighting in general at this location?',
            'Does this location have strong smells, more than what should be expected?',
          ]}
      />
        <ExpandableSection
        title="Size"
        intro="Size pertains to the physical dimensions and configurations that may impact comfort and accessibility. Think about seating designs, legroom, aisle widths, and space constraints within the environment."
        points={[
            'Does this location only have chairs with arms? Or does their seating have a weight limit?',
            'How much legroom is available between the rows of this theatre/stadium/etc?',
            'What is the physical space like here? Are the ceilings low? Narrow hallways?',
          ]}
      />
        <ExpandableSection
        title="Other"
        intro="The 'Other' category encompasses a range of miscellaneous yet crucial considerations. It includes restroom accessibility, facilities for caregivers, gender-neutral spaces, and accommodations not covered by other categories. Anything else you think could be useful can be tagged as this."
        points={[
            'Is there a public restroom? How easily accessible is it?',
            "Are there child changing stations in this bathroom? In all of them or just the Women's?",
            'Are there gender-neutral bathrooms in this location?',
            'Are the handicap stalls large enough to accommodate a caregiver?',
          ]}
      />
    </PageContainer>
  );
};

export default About;
