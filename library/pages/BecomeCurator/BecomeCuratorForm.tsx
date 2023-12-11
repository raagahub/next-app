import { Box, Button, Grid, Group, LoadingOverlay, Paper, Select, Stack, Text, TextInput, Textarea, Title } from "@mantine/core"
import useStyles from './BecomeCurator.styles'
import { isNotEmpty, useForm } from "@mantine/form";
import { useUser } from "../../hooks/useUser";
import { useRef, useState } from "react";


export const BecomeCuratorForm = () => {
  const { classes, theme } = useStyles();
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null); 
  const [loading, setLoading] = useState(false)
  const [submitted, updateSubmitted] = useState(false)

  const form = useForm({
    initialValues: {
      fullname: '',
      email: '',
      country: '',
      country_other: '',
      background: '',
      favourites: '',
      motivation: '',
      playlist: ''
    },
    validate: {
      country: isNotEmpty('This field cannot be empty'),
      country_other: (value, values) => (
        values.country === 'other' && !value ? 'Please specify the country' : null
      ),
      background: isNotEmpty('This field cannot be empty'),
      favourites: isNotEmpty('This field cannot be empty'),
      motivation: isNotEmpty('This field cannot be empty'),
    },
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) {
      // Handle validation errors
      console.log('Validation errors', form.errors);
    } else {
      // Programmatically submit the form
      if (formRef.current) {
        formRef.current.submit();
      }
    }

  }

  const handleSubmitFetch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    
    const formValidation = form.validate();
    if (!formValidation.hasErrors) {
      setLoading(true)
      // Construct form data
      const formData = new FormData();
      Object.entries(form.values).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('email', user?.email || '')
      formData.append('fullname', user?.user_metadata.full_name || '')

  
      try {
        const response = await fetch('https://formbold.com/s/oJKpw', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          // Handle successful submission
          console.log('Form submitted successfully');
          updateSubmitted(true)
          setLoading(false)
          // Optionally, reset the form or redirect the user
        } else {
          // Handle errors
          console.error('Form submission failed');
          setLoading(false)
        }
      } catch (error) {
        console.error('Error submitting form: ', error);
      }
    }
  };

  return (
    <Box className={classes.container}>
      <Paper className={classes.banner}
        sx={{ backgroundImage: `url('/geometric-patterns/6323198.jpg')`, backgroundColor: theme.colors['teal'][3] }} />
      <Grid className={classes.box} sx={{ backgroundColor: theme.colors['teal'][1] }} align='center'>
        <Grid.Col sm={12} lg={6} px={{ 'lg': 64 }}>
          <Title className={classes.title} align="left" sx={{ color: theme.colors['teal'][9] }}>
            Become a <Text span inherit color="dark.6">Curator</Text>
          </Title>
          <Group mt={32} w={{ 'lg': '90%', 'sm': '100%' }}>
            <Text size={'xl'}>Are you passionate about Carnatic music and eager to share it with the world? We're looking for knowledgeable and enthusiastic individuals to become curators on Ragahub. Fill out this form to get started on your journey as a Ragahub Curator.</Text>
          </Group>
        </Grid.Col>
        <Grid.Col sm={12} lg={6} >
          <Box className={classes.card} pos="relative">
          <LoadingOverlay visible={loading}/>
            
            {submitted 
            ? <Text>Thank you for your interest in becoming a Ragahub Curator. We'll review your application and get in touch if we find a good fit. Keep spreading the love for Carnatic music!</Text> 
            : <form onSubmit={handleSubmitFetch}>
              <Stack>
                <Group grow>
                <Select
                  name="country"
                  label="Currently Based In"
                  placeholder="Select your Country"
                  withAsterisk
                  data={[
                    { value: 'AU', label: 'Australia' },
                    { value: 'CA', label: 'Canada' },
                    { value: 'IN', label: 'India' },
                    { value: 'SG', label: 'Singapore' },
                    { value: 'UK', label: 'United Kingdom' },
                    { value: 'US', label: 'United States of America' },
                    { value: 'other', label: 'Other' },
                  ]}
                  {...form.getInputProps('country')}
                />

                  <TextInput
                    name="country_other"
                    placeholder="Korea"
                    label="If 'Other', please specify country:"
                    {...form.getInputProps('country_other')}
                  />
                </Group>

                

                <Textarea
                  name="background"
                  placeholder="Please share your experience and background in Carnatic music. This can include your training, interests, or any other relevant experiences."
                  label="Background in Carnatic Music"
                  withAsterisk
                  {...form.getInputProps('background')}
                />

                <Textarea
                  name="favourites"
                  placeholder="Tell us about your favorite Carnatic artists or composers and why they inspire you."
                  label="Favourite Carnatic Artists & Composers"
                  withAsterisk
                  {...form.getInputProps('favourites')}
                />

                <Textarea
                  name="motivation"
                  placeholder="Share your motivation for wanting to become a curator on Ragahub."
                  label="Why do you want to be a Curator for Ragahub?"
                  withAsterisk
                  {...form.getInputProps('motivation')}
                />

                <TextInput
                  name="playlist"
                  placeholder="https://www.youtube.com/watch?v=ZOHfNvSnQ28"
                  label="Share your Carnatic Playlist (Optional)"
                  description="Showcase your taste in Carnatic music by submitting a Youtube Playlist of Carnatic tracks."
                  {...form.getInputProps('playlist')}
                />

                <Button mt={16} type="submit" color="teal">Submit Application</Button>

              </Stack>
            </form>
          }


          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  )
}
