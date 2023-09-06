import { RagaCard } from "./RagaCard";

const mockRaga = {
    "id": 227,
    "format_name": "Arabhi",
    "name": "Arabhi",
    "melakarta": 29,
    "arohanam": "S R2 M1 P D2 S",
    "avarohanam": "S N3 D2 P M1 G3 R2 S",
    "aliases": ",aarabi,Arabhi/hamsAnandi",
    "is_janaka": false,
    "is_janya": true,
    "is_vakra": false,
    "is_bashanga": false,
    "is_upanga": true
}

export default {
  title: 'Raga Card',
};

export const Usage = () => <RagaCard raga={mockRaga} bookmarked={true}/>;