import LinkModel from 'models/LinkModel';
import { generateRandomString } from 'lib/Utilities';

const LinkRepository = {
    insertLink: async function(url: string) {
        if(!url.startsWith('http')) {
            url = 'http://' + url;
        }
        const link = await LinkModel.query().insert({
            from: generateRandomString(6),
            to: url
        });

        return link;
    },
    getLink: async function(from: string) {
        const link = await LinkModel.query().select('to')
            .findOne('from', from);

        return link;
    }
}

export default LinkRepository;