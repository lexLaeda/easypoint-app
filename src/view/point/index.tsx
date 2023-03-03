import React, {useState} from "react";
import {Button, Form, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {IEmployee} from "../employee";
import {
    useCreatePointMutation,
    useDeletePointMutation,
    useSearchPointsQuery,
    useSearchPointTypesQuery
} from "../../api/point";
import PointTable from "./PointTable";
import PointForm from "./PointForm";


export enum PointTypes {
    REFERENCE_POINT, WALL_MARK, FIXED_POINT
}

export enum PointStates {
    CREATED = 'CREATED',
    LOST = 'LOST',
    UPDATE_REQUIRED = 'UPDATE_REQUIRED',
    NOT_AVAILABLE = 'NOT_AVAILABLE',
    READY_TO_USE = 'READY_TO_USE'
}

export interface IPointType {
    id: number;
    code: PointTypes;
    name: string;
    description: string;
}

export interface IPointState {
    id: number;
    code: PointStates;
    name: string;
    description: string;
}

export interface IPoint {
    id: number;
    name: string;
    x: number;
    y: number;
    h: number;
    pointType: IPointType;
    pointState: IPointState;
    created?: Date;
    updated?: Date;
    creator: IEmployee;
}

export interface IPointCreateRequest {
    name: string;
    x: number;
    y: number;
    h: number;
    pointTypeId: number;
}

const PointPage = () => {
    const {data, isLoading} = useSearchPointsQuery();
    const pointTypes = useSearchPointTypesQuery();
    const [addPoint] = useCreatePointMutation()
    const [deletePoint] = useDeletePointMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pointForDelete, setPointForDelete] = useState<IPoint | undefined>(undefined);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const showDeleteModal = (point: IPoint) => {
        setPointForDelete(point)
    }

    const handleOk = (point: IPointCreateRequest) => {
        console.log(point);
        addPoint(point);
        form.resetFields();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDeleteCancel = () => {
        setPointForDelete(undefined);
    }

    const handleDelete = () => {
        deletePoint(pointForDelete?.id!!)
        setPointForDelete(undefined)
    }

    return <div style={{padding: '50px'}}>
        <Button type="primary" shape="round" icon={<PlusOutlined/>} size={'large'}
                onClick={showModal}
                style={{position: 'relative', float: 'right', marginBottom: '20px'}}/>
        {isLoading ? <h1>Loading</h1> : <PointTable points={data ? data : []} showDeleteModal={showDeleteModal}/>}
        <Modal title="Add point" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
            <PointForm onFinish={handleOk} form={form} pointTypes={pointTypes.data ? pointTypes.data : []}/>
        </Modal>
        <Modal title="Delete Point" open={pointForDelete !== undefined} onOk={handleDelete}
               onCancel={handleDeleteCancel}>
            <div>Are you sure you want to delete point {pointForDelete?.name} ?</div>
        </Modal>
    </div>
}

export default PointPage