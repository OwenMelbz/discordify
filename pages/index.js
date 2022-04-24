import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
    const [file, setFile] = useState(null)
    const router = useRouter()

    const onChange = file => {
        setFile(file)
    }

    const onSuccess = ({ name }) => {
        const url = `/share/${name}`

        router.push(url)
    }

    return (
        <>
            <Head>
                <title>Discordify - Bypass the pesky Discord file upload limits.</title>
                <meta name="description" content="Self-host your large Discord videos to avoid paying for Nitro and share with friends!" />
            </Head>

            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <Link href="/">
                        <a>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                        </a>
                    </Link>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Discordify Video
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Bypass the file size limit by uploading to Amazon S3
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Video File
                                </label>
                                <DropZone onChange={ onChange } />
                            </div>

                            <Uploader onSuccess={ onSuccess } file={ file } />
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}

const DropZone = ({ onChange: _onChange = null }) => {
    const dropZone = useRef()
    const [files, setFiles] = useState([])
    const [hovering, setHovering] = useState(false)

    const onChange = event => {
        event.preventDefault()
        event.stopPropagation()

        const _files = event?.dataTransfer?.files || event?.target?.files || []

        setFiles(_files)

        if (_onChange) {
            _onChange(_files.length ? _files[0] : null)
        }
    }

    const preventDefaults = event => {
        event.preventDefault()
        event.stopPropagation()

        return false
    }

    const highlight = () => setHovering(true)

    const unhighlight = () => setHovering(false)

    useEffect(() => {
        const _onChange = onChange
        const _preventDefaults = preventDefaults
        const _unhighlight = unhighlight
        const _highlight = highlight

        if (dropZone.current) {
            dropZone.current.addEventListener('drop', _onChange, false)

            ;['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
                dropZone.current.addEventListener(eventName, _preventDefaults, false)
            })

            ;['dragleave', 'drop'].forEach(eventName => {
                dropZone.current.addEventListener(eventName, _unhighlight, false)
            })

            ;['dragenter', 'dragover'].forEach(eventName => {
                dropZone.current.addEventListener(eventName, _highlight, false)
            })
        }

        return () => {
            if (dropZone.current) {
                dropZone.current.removeEventListener('drop', _onChange)

                ;['dragenter', 'dragover', 'dragleave'].forEach(eventName => {
                    dropZone.current.removeEventListener(eventName, _preventDefaults)
                })

                ;['dragleave', 'drop'].forEach(eventName => {
                    dropZone.current.removeEventListener(eventName, _unhighlight)
                })

                ;['dragenter', 'dragover'].forEach(eventName => {
                    dropZone.current.removeEventListener(eventName, _highlight)
                })
            }
        }
    }, [dropZone.current])

    return <div ref={ dropZone } className="mt-3 sm:col-span-2">
        <div className={ `max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${hovering ? 'border-indigo-300 bg-gray-100' : 'border-gray-300'}` }>
            <div className="space-y-1 text-center">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="flex text-sm text-gray-600">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                        <span>Upload a file</span>
                        <input
                            accept="video/*"
                            onChange={ onChange }
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                        />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">MP4, WEBM, MOV up to 100MB</p>
                <p className="text-xs text-gray-500 pt-2 font-bold">{ files.length ? files[0].name : null }</p>
            </div>
        </div>
    </div>
}

const Uploader = ({ onSuccess, file }) => {
    const [busy, setBusy] = useState(false)

    const doUpload = async event => {
        event?.preventDefault()

        setBusy(true)

        const { url, name } = await getUploadUrl()

        await uploadFile(url)

        onSuccess({
            url,
            name,
        })

        setBusy(false)
    }

    const getUploadUrl = async () => {
        const req = await fetch(`/api/upload/get-url?name=${encodeURIComponent(file.name)}&type=${encodeURIComponent(file.type)}`)

        return await req.json()
    }

    const uploadFile = async url => {
        return fetch(url, {
            method: 'PUT',
            body: file,
        })
    }

    return file ? <div>
        <button
            onClick={ doUpload }
            disabled={ busy }
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
            { busy ? 'Uploading...' : 'Upload' }
        </button>
    </div> : null
}
