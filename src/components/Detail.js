// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Button, Input, TextareaAutosize } from "@mui/base";
// import { Dialog, DialogActions, DialogTitle, IconButton, Menu, Toolbar, Tooltip } from "@mui/material";
// import { Box } from "@mui/system";
// import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
// import { Fragment } from "react";

// const DetailPage = (props) => {
//     const { showDetail, } = props;
//     return (
//         <Fragment>
//             {showDetail && (
//                 <Toolbar
//                     id="detialcontainer"
//                     sx={{
//                         width: "30%",
//                         height: "100%",
//                         backgroundColor: "rgb(255, 255, 255)",
//                         display: "flex",
//                         flexFlow: "column nowrap",
//                     }}
//                 >
//                     <Box
//                         id="detial"
//                         sx={{
//                             width: "100%",
//                             height: "4rem",
//                             padding: "0 12px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             gap: "10px",
//                         }}
//                     >
//                         <Tooltip
//                             title={
//                                 selectedTodo && selectedTodo.isDone
//                                     ? "已完成"
//                                     : "未完成"
//                             }
//                         >
//                             <IconButton onClick={handleDetailCplt}>
//                                 <FontAwesomeIcon
//                                     size="sm"
//                                     icon={cpltIcon}
//                                     color={
//                                         selectedTodo
//                                             ? "rgb(255, 128, 0)"
//                                             : "rgb(162, 162, 162)"
//                                     }
//                                 />
//                             </IconButton>
//                         </Tooltip>

//                         <Tooltip
//                             title={
//                                 selectedTodo &&
//                                 getCalendarDate(selectedTodo.date)
//                             }
//                         >
//                             <IconButton onClick={handleDetailDate}>
//                                 <FontAwesomeIcon
//                                     size="sm"
//                                     icon={faCalendarDays}
//                                     color={
//                                         selectedTodo && selectedTodo.date
//                                             ? getCalendarDate(
//                                                   selectedTodo.date
//                                               ) === "过期"
//                                                 ? "rgb(224, 49, 48)"
//                                                 : "rgb(71, 114, 249)"
//                                             : "rgb(162, 162, 162)"
//                                     }
//                                 />
//                             </IconButton>
//                         </Tooltip>

//                         <Tooltip
//                             title={
//                                 selectedTodo &&
//                                 getPriorityProp(selectedTodo.priority, "title")
//                             }
//                         >
//                             <IconButton onClick={handleDetailPri}>
//                                 <FontAwesomeIcon
//                                     size="sm"
//                                     icon={faFlag}
//                                     color={
//                                         selectedTodo
//                                             ? `rgb(${getPriorityProp(
//                                                   selectedTodo.priority,
//                                                   "color"
//                                               )})`
//                                             : "rgb(162, 162, 162)"
//                                     }
//                                 />
//                             </IconButton>
//                         </Tooltip>

//                         <Tooltip title={selectedTodo && "删除"}>
//                             <IconButton onClick={makeConfirm}>
//                                 <FontAwesomeIcon
//                                     size="sm"
//                                     icon={faTrashCan}
//                                     color={
//                                         selectedTodo
//                                             ? "gray"
//                                             : "rgb(162, 162, 162)"
//                                     }
//                                 />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>
//                     {/* <Box
//                         sx={{
//                             width: "100%",
//                         }}
//                     >
//                         <Slider
//                             aria-label="Temperature"
//                             defaultValue={0}
//                             // getAriaValueText={valuetext}
//                             valueLabelDisplay="auto"
//                             step={10}
//                             marks
//                             min={0}
//                             max={100}
//                         />
//                     </Box> */}

//                     <Box
//                         id="title"
//                         sx={{
//                             width: "100%",
//                             height: "4rem",
//                             padding: "0 12px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "start",
//                             gap: "10px",
//                         }}
//                     >
//                         <Input
//                             style={{
//                                 fontSize: "1.2rem",
//                                 fontWeight: "600",
//                             }}
//                             value={selectedTodo && selectedTodo.title}
//                             onChange={handleDetialTitleChange}
//                         />
//                     </Box>

//                     <Box
//                         id="description"
//                         sx={{
//                             width: "100%",
//                             maxHeight: "60%",
//                             display: "flex",
//                             justifyContent: "start",
//                             gap: "10px",
//                         }}
//                     >
//                         <TextareaAutosize
//                             maxRows="18"
//                             style={{
//                                 width: "100%",
//                                 fontSize: "0.875rem",
//                                 fontWeight: "400",
//                                 lineHeight: "1.5",
//                                 padding: "12px",
//                                 borderRadius: "12px 12px 0 12px",
//                                 color: "#24292f",
//                                 background: "#fff",
//                                 border: "1px solid #d0d7de",
//                                 boxShadow: "0px 2px 2px #f6f8fa",

//                                 "&:hover": {
//                                     borderColor: "#3399FF",
//                                 },

//                                 "&:focus": {
//                                     borderColor: "#3399FF",
//                                     boxShadow: "0 0 0 3px #b6daff",
//                                 },

//                                 "&:focusVisible": {
//                                     outline: "0",
//                                 },
//                             }}
//                             value={selectedTodo ? selectedTodo.description : ""}
//                             onChange={handleDetailDescChange}
//                         />
//                     </Box>

//                     <Box
//                         id="submitbtn"
//                         sx={{
//                             marginTop: "10px",
//                             width: "100%",
//                             display: "flex",
//                             flexFlow: "row nowrap",
//                             justifyContent: "space-around",
//                             alignItems: "center",
//                         }}
//                     >
//                         <Button
//                             sx={{
//                                 width: "40%",
//                                 color: "black",
//                             }}
//                             onClick={() => {
//                                 handleCancel();
//                             }}
//                         >
//                             取消
//                         </Button>
//                         <Button
//                             sx={{
//                                 width: "40%",
//                                 color: "black",
//                             }}
//                             onClick={() => {
//                                 handleSubmit();
//                             }}
//                             // 这里有一个想法，就是当前面这些信息改变的时候，保存才可操作，否则不能操作
//                         >
//                             保存
//                         </Button>
//                     </Box>
//                 </Toolbar>
//             )}

//             <Menu
//                 anchorEl={dePriorityMenuAnchor}
//                 open={!!dePriorityMenuAnchor}
//                 onClick={() => setDePriorityMenuAnchor(null)}
//                 onClose={() => setDePriorityMenuAnchor(null)}
//                 MenuListProps={{
//                     disablePadding: true,
//                     sx: {
//                         padding: "1rem",
//                     },
//                 }}
//             >
//                 <Box component="li">
//                     <Typography
//                         paragraph
//                         sx={{
//                             fontSize: "0.8rem",
//                             color: "rgba(0, 0, 0, 0.3)",
//                         }}
//                     >
//                         优先级
//                     </Typography>
//                     <Box
//                         component="ul"
//                         onClick={handleDePriorityChange}
//                         sx={{
//                             display: "flex",
//                             gap: "0 0.75rem",
//                         }}
//                     >
//                         <PriorityRadio
//                             priority={3}
//                             active={selectedTodo.priority === 3}
//                         />
//                         <PriorityRadio
//                             priority={2}
//                             active={selectedTodo.priority === 2}
//                         />
//                         <PriorityRadio
//                             priority={1}
//                             active={selectedTodo.priority === 1}
//                         />
//                         <PriorityRadio
//                             priority={0}
//                             active={selectedTodo.priority === 0}
//                         />
//                     </Box>
//                 </Box>
//             </Menu>

//             <Menu
//                 anchorEl={deDateMenuAnchor}
//                 open={!!deDateMenuAnchor}
//                 onClose={() => setDeDateMenuAnchor(null)}
//                 MenuListProps={{
//                     disablePadding: true,
//                     sx: {
//                         padding: "1rem",
//                     },
//                 }}
//             >
//                 <LocalizationProvider
//                     dateAdapter={AdapterDayjs}
//                     adapterLocale="zh-cn"
//                 >
//                     <DateCalendar
//                         disablePast
//                         value={selectedTodo.date}
//                         onChange={handleDeCalendarChange}
//                     />
//                 </LocalizationProvider>
//             </Menu>

//             <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
//                 <DialogTitle>确定要删除该日程吗？</DialogTitle>
//                 <DialogActions>
//                     <Button
//                         onClick={() => {
//                             setOpenDialog(false);
//                             console.log("取消");
//                         }}
//                     >
//                         取消
//                     </Button>
//                     <Button
//                         onClick={() => {
//                             setOpenDialog(false);
//                             handleDetialDelete();
//                             console.log("确认");
//                         }}
//                     >
//                         确定
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Fragment>
//     );
// };
// export default DetailPage;
