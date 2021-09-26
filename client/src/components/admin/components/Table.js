import React from 'react';
import { TableUserActions } from './TableUserActions';
import { TableUserBlock } from './TableUserBlock';


export const Table = () => {
    return (
        <>
            <div class="alert alert-secondary" role="alert">
                Acceso
            </div>
            <div className="card mb-5">
                <div className="card-body">
                    <h5 className="card-title">Usuarios</h5>
                    <div className="row">
                        <div className="col-sm">
                            {/* desbodar contenido revisar luego .... */}
                            <TableUserBlock />
                            <TableUserActions />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
