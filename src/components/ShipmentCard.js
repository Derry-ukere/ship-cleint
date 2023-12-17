/* eslint-disable react/prop-types */
import React from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box } from '@mui/material';

const ShipmentDetails = ({ ShipmentDetails }) => {

    React.useEffect(() => {
        console.log('from card', ShipmentDetails)
    }, [ShipmentDetails])
    const { senderName, receiverName, trackingNumber, details, status, locations } = ShipmentDetails
    const renderTree = (locations) => (
        <>

            {locations.map((location, index) => (
                <TreeView
                key={index}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                >

                    <TreeItem nodeId="1" label={location.location} >
                        <TreeItem nodeId="2" label={location.description} />
                    </TreeItem>
                </TreeView>

            ))}

        </>


    );


    return (
        <Box>

            <h1>Shipment Details</h1>
            <p>Status: {status}</p>
            <p>Contents: {details.contents}</p>
            <p>Weight: {details.weight}</p>
            <p>Dimensions: {details.dimensions}</p>
            <p>Sender: {senderName}</p>
            <p>Receiver: {receiverName}</p>
            <p>Tracking Number: {trackingNumber}</p>

            <p>locations :</p>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {renderTree(locations)}
            </TreeView>
        </Box>
    );
};

export default ShipmentDetails;
