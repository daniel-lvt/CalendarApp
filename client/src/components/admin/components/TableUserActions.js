import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadInformationLogs } from '../../../actions/users';

export const TableUserActions = () => {


    const { logs, isLogs } = useSelector(state => state.user.logsInfo)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadInformationLogs());
    }, [dispatch])

    if (isLogs) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    } else {

        const data = logs[0];

        return (
            <div className="card mt-5">
                <div className="card-body">
                    <h5 className='pb-2'>Logs de Actividad</h5>
                    <table className="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Date</th>
                                <th scope="col">Method</th>
                                <th scope="col">Url</th>
                                <th scope="col">Status</th>
                                <th scope="col">Ip</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                data.map(({ user, date, method, url, status, ip }) => (
                                    <tr key={date}>
                                        <th scope="row">{user}</th>
                                        <td>{date}</td>
                                        <td>{method}</td>
                                        <td>{url}</td>
                                        <td>{status}</td>
                                        <td>{ip}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }

}
