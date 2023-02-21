import Header from "@/components/header"
import Opcion from "@/components/opcion"
import Head from "next/head"

const Layout = ({title, description,children})=>{
    return(
        <>
            <Head>
                <title>{title}</title>
                <meta name="description:" content={description} />
            </Head>
            <main>
                <Header/>
                    {children}
                <Opcion/>
            </main>
        </>
    )
}
Layout.defaultProps ={
    title: 'TerraBellum',
    description: '.'
}

export default Layout;
