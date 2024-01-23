'use client'
import React, { useState } from 'react'
import { FilterMatchMode } from 'primereact/api';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface Item {
    id: String,
    type: String
    capacity: Number,
    location: String,
    status: String,
    last_emptied_at: Date
}

const Datatable: React.FC<{ items: Item[]; loading: boolean}> = ({ items, loading }) => {    
    const defaultFilters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [filters, setFilters] = useState<DataTableFilterMeta>(defaultFilters);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const initFilters = () => {
        setFilters(defaultFilters);
        setGlobalFilterValue('');
    };

    const columns = [
        { field: 'BinID', header: 'BinID' },
        { field: 'Capacity', header: 'Capacity' },
        { field: 'Location', header: 'Location' },
        { field: 'Status', header: 'Status' },
        { field: 'LastEmptied', header: 'Last Emptied' },
        { field: 'Charge', header: 'Charge' },

    ]
    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        setGlobalFilterValue(value);
    };

    const searchFilter = () => {
        const value = globalFilterValue;
        setFilters((prevFilters) => ({ ...prevFilters, global: { value, matchMode: FilterMatchMode.CONTAINS } }));
    }

    const onRowSelect = (event: { data: { Id: string; }; }) => {
        window.open('https://www.karafun.com/web/?song=' + event.data.Id)
    };

    const renderHeader = () => {
        return (
            <div>
                <span>
                    <Button className="mr-2" type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                    <span className="p-input-icon-left">
                        <InputText id="employeeSearch" value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                        <Button className="mr-2" type="button" icon="pi pi-search" label="Search" outlined onClick={searchFilter} />
                    </span>
                </span>
            </div>
        )
    }

    const header = renderHeader();

    return (
        <div>
            <DataTable
                value={items}
                paginator
                rows={20}
                filters={filters}
                loading={loading}
                filterDisplay="row"
                selectionMode="single"
                selection={selectedItem ? selectedItem : null}
                onSelectionChange={(e) => setSelectedItem(e.value as Item)}
                onRowSelect={onRowSelect}
                metaKeySelection={false}
                globalFilterFields={['BinID', 'Capacity', 'Location', 'Status', 'LastEmptied', 'Charge']}
                header={header}
                emptyMessage="No Songs Found"
                tableStyle={{ minWidth: '50rem' }}
            >
                {columns.map((col) => {
                    return (
                        <Column key={col.field} sortable field={col.field} header={col.header} />
                    )
                })
                }
            </DataTable>

        </div>
    )
}

export default Datatable
