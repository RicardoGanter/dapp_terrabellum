import Header from "./header.jsx"
import Opcion from "./opcion.jsx"
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
                <div style={{margin:'80px 140px 0 140px'}}>
                    {children}
                </div>
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
