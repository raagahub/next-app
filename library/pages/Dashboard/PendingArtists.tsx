import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useState } from "react"
import { PendingArtist, SubmissionArtist, SubmissionPendingArtist, deleteSubmissionPendingArtist, insertSubmissionArtist } from "../../helpers/ArtistHelpers"
import { databaseErrorNotification } from "../../helpers/NotificationHelpers"
import { Badge, Button, Group, Table, Text } from "@mantine/core"
import { statusColorMap } from "./DashboardHelper"
import dayjs from 'dayjs';
import { useUser } from "../../hooks/useUser"

export const PendingArtists = () => {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [pendingArtists, setPendingArtists] = useState<PendingArtist[]>([])

    async function getPendingArtists() {
        const { data, status, error } = await supabase
            .from('pending_artists')
            .select('*')

        if (status == 200 && data) {
            setPendingArtists(data as PendingArtist[])
        }

        if (error) {
            databaseErrorNotification(error)
        }

    }

    useEffect(() => {
        getPendingArtists()
    }, [user])

    const artistsRows = pendingArtists.map((artist) => (
        <tr key={artist.id}>
            <td><Badge color={statusColorMap[artist.status]}>{artist.status}</Badge></td>
            <td><Text fw={500}>{artist.name}</Text></td>
            <td>{artist.main_instrument}</td>
            <td>{dayjs(artist.submitted_at).format('DD-MM-YYYY')}</td>
            <td>
                <Group>
                    <Button size={'xs'} variant="default">Edit</Button>
                    <Button size={'xs'} color={'teal'} onClick={() => { approveArtist(artist) }}>Approve</Button>
                </Group>
            </td>
        </tr>
    ));

    async function approveArtist(artist: PendingArtist) {
        const { status, data, error } = await supabase
            .from('artists')
            .insert([{ name: artist.name, main_instrument: artist.main_instrument }])
            .select()
            .single()

        if (status == 201 && data) {
            const approvedArtistId = data.id

            const { data: subArtists, status: subArtistsStatus, error: subArtistsError } = await supabase
                .from('submission_pending_artists')
                .select()
                .eq('pending_artist_id', artist.id)

            if (subArtistsStatus == 200 && subArtists) {
                subArtists.forEach((subArtist: SubmissionPendingArtist) => {
                    insertSubmissionArtist(subArtist, approvedArtistId, supabase);
                    deleteSubmissionPendingArtist(subArtist, supabase)

                })
            }

            if (subArtistsError) {
                databaseErrorNotification(subArtistsError)
            }

            const { status: pendingStatus, error: pendingError } = await supabase
                .from('pending_artists')
                .update([{ status: 'approved', approved_artist_id: approvedArtistId }])
                .eq('id', artist.id)

            if (pendingError) {
                databaseErrorNotification(pendingError)
            }
        }

        if (error) {
            databaseErrorNotification(error)
        }

        getPendingArtists()
    }

    

    return (
        <div>
            <Group>
                <Text size={'lg'} fw={700}>Artist Submissions</Text>

            </Group>
            <Table mt={16} highlightOnHover>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Name</th>
                        <th>Instrument</th>
                        <th>Date Submitted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>{artistsRows}</tbody>
            </Table>
        </div >
    )
}
