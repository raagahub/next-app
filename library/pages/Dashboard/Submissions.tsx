import { ActionIcon, Badge, Button, Center, Drawer, Group, Spoiler, Table, Text } from '@mantine/core'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import React, { useEffect, useState } from 'react'
import { databaseErrorNotification } from '../../helpers/NotificationHelpers'
import dayjs from 'dayjs';
import { PendingArtist, SubmissionArtist, SubmissionPendingArtist, processSubmissionArtists } from '../../helpers/ArtistHelpers';
import { statusColorMap } from './DashboardHelper';
import { useUser } from '../../hooks/useUser';
import { Submission, approveSubmissionStatus, rejectSubmissionStatus } from '../../helpers/SubmissionHelpers';
import { insertNewComposition } from '../../helpers/CompositionHelpers';
import { MusicVideo, insertExistingMusicVideo, insertNewMusicVideo } from '../../helpers/MusicVideoHelper';
import { PostgrestError } from '@supabase/supabase-js';
import { IconCheck, IconCross, IconEditCircle, IconEye, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { SubmissionPreview } from '../../components/music_components/SubmissionPreview/SubmissionPreview';


export const Submissions = () => {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [opened, { open, close }] = useDisclosure(false);
    const [preview, setPreview] = useState<Submission | null>(null)

    async function getSubmissions() {
        const { data, status, error } = await supabase
            .from('submissions')
            .select('*, ragas (format_name), talas (name), composers (name), compositions (title), submission_artists (role, instrument, artists (name)), submission_pending_artists (role, instrument, pending_artists (name))')

        if (status == 200 && data) {
            setSubmissions(data as Submission[])
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    useEffect(() => {
        getSubmissions()
    }, [])

    async function approveSubmission(submission: Submission) {
        if (!user.user) {
            // TODO: Prompt user to login
            return;
        }
    
        try {
            // Start transaction
            // await supabase.rpc('start_transaction');
            // Not supported by Supabase -> use Prisma in future
    
            let musicVideoId = null;
    
            if (submission.new_composition) {
                const compositionResult = await insertNewComposition(submission, supabase);
                const musicVideoResult: MusicVideo = await insertNewMusicVideo(compositionResult, submission, user.user.id, supabase);
    
                musicVideoId = musicVideoResult.id;
            } else {
                const musicVideoResult: MusicVideo = await insertExistingMusicVideo(submission, user.user.id, supabase);
    
                musicVideoId = musicVideoResult.id;
            }
    
            await approveSubmissionStatus(submission, musicVideoId, supabase);
            await processSubmissionArtists(submission.id, musicVideoId, supabase);
    
            // Commit transaction
            // await supabase.rpc('commit_transaction');
        } catch (error) {
            // Rollback transaction and handle error
            // await supabase.rpc('rollback_transaction');
            databaseErrorNotification(error as PostgrestError);
        }
        getSubmissions()
    }

    async function rejectSubmission(submission: Submission) {
        if (!user.user) {
            return;
        }
        try {
            await rejectSubmissionStatus(submission, supabase);
        } catch (error) {
            databaseErrorNotification(error as PostgrestError);
        }
        getSubmissions()
    }

    const showPreview = (submission: Submission) => {
        setPreview(submission)
        open()
    }

    if (submissions.length > 0) {
        const submissionRows = submissions.map((submission) => (
            <tr key={submission.id}>
                <td><Badge color={statusColorMap[submission.status]}>{submission.status}</Badge></td>
                <td><Badge variant='default'>{submission.format}</Badge></td>
                <td><Text fw={500}>{submission.composition_title}</Text></td>
                <td>{submission.composers.name}</td>
                <td>{submission.ragas.format_name} | {submission.talas.name}</td>
                <td><Spoiler maxHeight={22} showLabel="Show more" hideLabel="Hide">
                    {submission.submission_artists.map((artist: SubmissionArtist) => (<Text key={`${submission.id}_${artist.artists.name}_${artist.instrument}`}><Badge>{artist.role}</Badge> {artist.artists.name} | {artist.instrument}</Text>))}
                    {submission.submission_pending_artists.map((artist: SubmissionPendingArtist) => (<Text key={`${submission.id}_${artist.pending_artist_id}_${artist.instrument}`}><Badge variant='outline'>{artist.role}</Badge> {artist.pending_artists.name} | {artist.instrument}</Text>))}
                </Spoiler></td>
                <td>{dayjs(submission.submitted_at).format('DD-MM-YYYY')}</td>
                <td width={175}>
                    <Group spacing={'sm'}>
                        <ActionIcon variant='outline' onClick={() => {showPreview(submission)}}><IconEye size="1.125rem"/></ActionIcon>
                        <ActionIcon variant='outline' color='blue' disabled={submission.status != "pending"}><IconEditCircle size="1.125rem"/></ActionIcon>
                        <ActionIcon variant='outline' color='red' disabled={submission.status != "pending"} onClick={() => { rejectSubmission(submission) }}><IconX size="1.125rem"/></ActionIcon>
                        <ActionIcon variant='filled' color='teal' disabled={submission.status != "pending"} onClick={() => { approveSubmission(submission) }}><IconCheck size="1.125rem"/></ActionIcon>
                    </Group>
                </td>
            </tr>
        ));

        return (
            <div>
                <Drawer opened={opened} onClose={close} position='right' withCloseButton={false} padding={'lg'}>
                    <SubmissionPreview submission={preview}/>
                </Drawer>
                <Group>
                    <Text size={'lg'} fw={700}>Music Submissions</Text>
    
                </Group>
                <Table mt={16} highlightOnHover>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Format</th>
                            <th>Title</th>
                            <th>Composer</th>
                            <th>Raga | Tala</th>
                            <th>Artists</th>
                            <th>Date Submitted</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{submissionRows}</tbody>
                </Table>
            </div >
        )
    } else {
        return (
            <Center>
                <Text>No Pending Submissions</Text>
            </Center>
        )
    }
    
}
