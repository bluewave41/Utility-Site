import LinkRepository from 'repositories/LinkRepository';

const Link = (props) => {
    return (
        <div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const { link } = context.query;
    const { req, res } = context;
    const foundLink = await LinkRepository.getLink(link);
    console.log(foundLink)

    return {
        redirect: {
            permanent: false,
            destination: foundLink.to
        },
        props: {}
    }
}

export default Link;