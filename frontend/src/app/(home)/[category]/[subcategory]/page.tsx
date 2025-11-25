interface Props {
    params: Promise<{
        category: string,
        subcategory: string,
    }>
}

const Page = async ({params}: Props) => {
    const {category, subcategory} = await params

    return (
        <div>
            Category Page: {category}
            <br />
            Subcategory Page: {subcategory}
        </div>
    )
}
export default Page;