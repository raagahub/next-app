CREATE TABLE submissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    youtube_url TEXT NOT NULL,
    youtube_video_id TEXT NOT NULL,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    composition_id BIGINT REFERENCES compositions (id), -- Nullable for new compositions
    new_composition BOOLEAN DEFAULT FALSE, -- Flag for new compositions
    raga_id BIGINT REFERENCES ragas (id),
    tala_id BIGINT REFERENCES talas (id),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID REFERENCES profiles (id) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'merged')),
    notes TEXT,
    approved_video_id UUID REFERENCES raga_videos (video_id) -- Nullable until the submission is approved
);

CREATE TABLE submission_artists (
    submission_id BIGINT REFERENCES submissions (id),
    artist_id BIGINT REFERENCES artists (id),
    role TEXT CHECK (role IN ('main', 'accompanying')),
    PRIMARY KEY (submission_id, artist_id)
);

CREATE TABLE submission_pending_artists (
    submission_id BIGINT REFERENCES submissions (id),
    pending_artist_id BIGINT REFERENCES pending_artists (id),
    role TEXT CHECK (role IN ('main', 'accompanying')),
    PRIMARY KEY (submission_id, pending_artist_id)
);
