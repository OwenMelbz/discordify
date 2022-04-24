import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

export default function Share({ name, url }) {
    return <>
        <Head>
            <title>{name} - Discordify</title>
            <meta name="description" content="Self-host your large Discord videos to avoid paying for Nitro and share with friends!" />
            <meta name="robots" content="noindex, nofollow" />
            <meta property="og:title" content={`${name} - Discordify`} />
            <meta property="og:site_name" content="Discordify" />
            <meta property="og:url" content={ url } />
            <meta property="og:description" content="Self-host your large Discord videos to avoid paying for Nitro and share with friends!" />
            <meta property="og:type" content="video" />
            <meta property="og:video:width" content="1280" />
            <meta property="og:video:height" content="720" />
            <meta property="og:video:type" content="application/mp4" />
            <meta property="og:video" content={ url } />
        </Head>

        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                    className="mx-auto h-12 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Discordify Video
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Bypass the file size limit by uploading to Amazon S3
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <video
                        className="w-full h-auto"
                        playsInline
                        muted
                        autoPlay
                        controls
                        src={ url }
                    />

                    <div className="mt-8">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Share URL
                        </label>
                        <div className="mt-1">
                            <input
                                onClick={ e => e.target.select() }
                                type="url"
                                name="url"
                                id="url"
                                readOnly
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={ typeof window != 'undefined' ? window?.location?.href : 'Loading...' }
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Download URL
                        </label>
                        <div className="mt-1">
                            <input
                                onClick={ e => e.target.select() }
                                type="url"
                                name="url"
                                id="url"
                                readOnly
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={ url }
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </>
}

export const getServerSideProps = context => {
    const name = context.params.slug
    const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${name}`

    return {
        props: {
            name,
            url,
        },
    }
}
