import LinkModel from 'models/LinkModel';
import { generateRandomString } from 'lib/Utilities';

const LinkRepository = {
    insertLink: async function(url: string) {
        const link = await LinkModel.query().insert({
            from: generateRandomString(6),
            to: url
        });

        return link;
    }
}

export default LinkRepository;